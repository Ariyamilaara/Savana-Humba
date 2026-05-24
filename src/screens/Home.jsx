import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import ListBlog from '../components/ListBlog';
import { colors, fonts } from '../theme';

// URL API MockAPI SavanaHumba
const API_URL = 'https://6a0ad26921e445625696a97c.mockapi.io/api/artikel';

const Home = () => {
  const navigation = useNavigation();

  // State untuk data artikel dari API
  const [artikelList, setArtikelList] = useState([]);
  // State loading saat fetch data
  const [loading, setLoading] = useState(false);
  // State error jika gagal fetch
  const [error, setError] = useState(null);
  // State menyimpan id artikel yang di-like sebagai string
  const [likedIds, setLikedIds] = useState([]);
  // State menghitung artikel yang dibaca
  const [readCount, setReadCount] = useState(0);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // Fungsi GET — ambil semua artikel dari API
  const fetchArtikel = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setArtikelList(response.data);
    } catch (err) {
      setError('Gagal memuat artikel 😕');
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchArtikel sekali saat pertama masuk halaman
  useEffect(() => {
    fetchArtikel();
  }, []);

  // Panggil ulang fetchArtikel saat halaman difokuskan kembali
  // agar data fresh setelah tambah/edit/hapus artikel
  useFocusEffect(
    useCallback(() => {
      fetchArtikel();
    }, [])
  );

  // Fungsi handleLike — cegah error jika id undefined
  const handleLike = (id) => {
    if (!id) return;
    const idStr = id.toString();
    if (likedIds.includes(idStr)) {
      setLikedIds(likedIds.filter((likedId) => likedId !== idStr));
    } else {
      setLikedIds([...likedIds, idStr]);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Selamat Datang 👋</Text>
            {/* Tombol + navigasi ke TambahArtikel */}
            <TouchableOpacity onPress={() => navigation.navigate('TambahArtikel')}>
              <Ionicons name="add-circle" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.appName}>SavanaHumba</Text>
          <Text style={styles.subtitle}>Jelajahi keindahan alam & budaya Sumba</Text>
          <Text style={styles.readInfo}>📖 Artikel dibaca: {readCount}</Text>
        </View>

        {/* Loading indicator saat fetch data */}
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 40 }}
          />
        )}

        {/* Pesan error jika gagal fetch */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchArtikel}>
              <Text style={styles.retryText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* List artikel dari API */}
        {!loading && !error && artikelList.map((item, index) => (
          <ListBlog
            key={item.id ? item.id.toString() : index.toString()}
            title={item.title}
            category={item.category}
            image={item.image}
            isLiked={item.id ? likedIds.includes(item.id.toString()) : false}
            onPress={() => navigation.navigate('BlogDetail', { blogId: item.id })}
            onReadMore={() => {
              setReadCount(readCount + 1);
              navigation.navigate('BlogDetail', { blogId: item.id });
            }}
            onLike={() => item.id && handleLike(item.id.toString())}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
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
  errorContainer: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
});