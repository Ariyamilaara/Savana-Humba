import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity, // ← tambahkan import ini
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // ← tambahkan import ini
import ListBlog from '../components/ListBlog';
import { colors, fonts } from '../theme';

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

const Home = () => {
  const navigation = useNavigation();
  const [likedIds, setLikedIds] = useState([]);
  const [readCount, setReadCount] = useState(0);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const handleLike = (id) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================================
            HEADER
            Terdiri dari:
            - Baris atas: sapaan + tombol tambah artikel (flexDirection row)
            - Nama aplikasi SavanaHumba
            - Subtitle
            - Info artikel dibaca
        ================================ */}
        <View style={styles.header}>

          {/* Baris atas — sapaan kiri, tombol + kanan */}
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Selamat Datang 👋</Text>
            {/* Tombol + untuk navigasi ke halaman TambahArtikel */}
            <TouchableOpacity
              onPress={() => navigation.navigate('TambahArtikel')}
            >
              <Ionicons name="add-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Nama aplikasi */}
          <Text style={styles.appName}>SavanaHumba</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>Jelajahi keindahan alam & budaya Sumba</Text>

          {/* Info jumlah artikel dibaca */}
          <Text style={styles.readInfo}>📖 Artikel dibaca: {readCount}</Text>

        </View>

        {/* ================================
            LIST BLOG
            Looping dummyData menggunakan map
        ================================ */}
        {dummyData.map((item) => (
          <ListBlog
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            isLiked={likedIds.includes(item.id)}
            onPress={() => navigation.navigate('BlogDetail', { blogId: item.id })}
            onReadMore={() => {
              setReadCount(readCount + 1);
              navigation.navigate('BlogDetail', { blogId: item.id });
            }}
            onLike={() => handleLike(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  // Container utama halaman
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Padding konten scroll
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Header keseluruhan
  header: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  // Baris atas header — sapaan kiri, tombol + kanan
  headerTop: {
    flexDirection: 'row',         // ← susun horizontal
    justifyContent: 'space-between', // ← sapaan kiri, tombol kanan
    alignItems: 'center',
    marginBottom: 2,
  },
  // Teks sapaan "Selamat Datang 👋"
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  // Nama aplikasi "SavanaHumba"
  appName: {
    fontSize: 30,
    color: colors.primary,
    fontFamily: fonts.extraBold,
    marginTop: 2,
  },
  // Teks subtitle
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
    marginTop: 4,
  },
  // Badge info artikel dibaca
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