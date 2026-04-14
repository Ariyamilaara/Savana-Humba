import React, { useState } from 'react'; // useState untuk membuat state

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import ListBlog from './src/components/ListBlog';
import { colors, fonts } from './src/theme';

// Data dummy artikel wisata Sumba
const dummyData = [
  {
    id: '1',
    title: 'Mengenal Savana Sumba yang Eksotis',
    category: 'Alam',
    image: 'https://i.pinimg.com/736x/10/e8/5e/10e85ec271bbc9abba77b615ec771a27.jpg',
  },
  {
    id: '2',
    title: 'Wisata Budaya Sumba yang Kaya',
    category: 'Budaya',
    image: 'https://i.pinimg.com/736x/98/ac/6c/98ac6cf2c3561de99c75d96f3ece9ec3.jpg',
  },
  {
    id: '3',
    title: 'Kuliner Khas Sumba Wajib Dicoba',
    category: 'Kuliner',
    image: 'https://i.pinimg.com/736x/45/9f/47/459f470f7e3df2f5bd4b845974a907f2.jpg',
  },
];

export default function App() {

  // ==============================
  // PENERAPAN STATE
  // ==============================

  // State 1 — menyimpan artikel yang sedang dipilih/aktif
  // Nilai awal null artinya belum ada artikel yang dipilih
  const [selectedId, setSelectedId] = useState(null);

  // State 2 — menyimpan daftar id artikel yang di-like
  // Nilai awal array kosong artinya belum ada yang di-like
  const [likedIds, setLikedIds] = useState([]);

  // State 3 — menyimpan jumlah total artikel yang sudah dibaca
  // Nilai awal 0
  const [readCount, setReadCount] = useState(0);

  // Fungsi untuk menangani tombol "Baca Selengkapnya" ditekan
  // Mengubah state selectedId dan menambah readCount
  const handleReadMore = (id, title) => {
    setSelectedId(id);             // Mengubah state artikel yang dipilih
    setReadCount(readCount + 1);   // Menambah jumlah artikel yang dibaca
    Alert.alert('SavanaHumba', `Membuka artikel: ${title}\nTotal dibaca: ${readCount + 1}`);
  };

  // Fungsi untuk menangani tombol like ditekan
  // Jika sudah di-like maka unlike, jika belum maka like
  const handleLike = (id) => {
    if (likedIds.includes(id)) {
      // Jika sudah di-like, hapus dari daftar likedIds
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
    } else {
      // Jika belum di-like, tambahkan ke daftar likedIds
      setLikedIds([...likedIds, id]);
    }
  };

  // Hook untuk memuat font kustom Nunito
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // Jika font belum dimuat, tampilkan layar kosong
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Datang 👋</Text>
          <Text style={styles.appName}>SavanaHumba</Text>
          <Text style={styles.subtitle}>
            Jelajahi keindahan alam & budaya Sumba
          </Text>

          {/* Menampilkan state readCount — jumlah artikel yang sudah dibaca */}
          <Text style={styles.readInfo}>
            📖 Artikel dibaca: {readCount}
          </Text>
        </View>

        {/* List Blog */}
        {dummyData.map((item) => (
          // ==============================
          // PENERAPAN PROPS
          // ==============================
          // Setiap data dari dummyData dikirim sebagai PROPS ke komponen ListBlog
          <ListBlog
            key={item.id}
            // Props data artikel
            title={item.title}        // Props judul → diterima ListBlog
            category={item.category}  // Props kategori → diterima ListBlog
            image={item.image}        // Props foto → diterima ListBlog
            // Props state — mengirim nilai state ke ListBlog
            isSelected={selectedId === item.id}       // Props apakah artikel ini dipilih
            isLiked={likedIds.includes(item.id)}      // Props apakah artikel ini di-like
            // Props fungsi — mengirim fungsi ke ListBlog
            onPress={() => handleReadMore(item.id, item.title)}
            onReadMore={() => handleReadMore(item.id, item.title)}
            onLike={() => handleLike(item.id)}        // Props fungsi like
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  appName: {
    fontSize: 30,
    color: colors.primary,
    fontFamily: fonts.extraBold,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
    marginTop: 4,
  },
  // Style untuk info jumlah artikel dibaca
  readInfo: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});
