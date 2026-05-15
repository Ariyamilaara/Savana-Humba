import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, fonts } from '../theme';
import ItemWisata from '../components/ItemWisata';

// Data kategori wisata Sumba
const kategoriData = [
  { id: '1', label: 'Pantai' },
  { id: '2', label: 'Savana' },
  { id: '3', label: 'Air Terjun' },
  { id: '4', label: 'Budaya' },
  { id: '5', label: 'Kuliner' },
];

// Data wisata Sumba
const wisataData = [
  { id: '1', title: 'Pantai Nihiwatu', kategori: 'Pantai', lokasi: 'Sumba Barat Daya', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400' },
  { id: '2', title: 'Savana Puru Kambera', kategori: 'Savana', lokasi: 'Sumba Timur', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
  { id: '3', title: 'Air Terjun Lapopu', kategori: 'Air Terjun', lokasi: 'Sumba Tengah', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400' },
  { id: '4', title: 'Kampung Adat Ratenggaro', kategori: 'Budaya', lokasi: 'Sumba Barat', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400' },
  { id: '5', title: 'Pantai Walakiri', kategori: 'Pantai', lokasi: 'Sumba Timur', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
  { id: '6', title: "Kuliner Se'i Babi Sumba", kategori: 'Kuliner', lokasi: 'Waingapu', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
];

// Komponen Discover — halaman pencarian dan filter wisata Sumba
const Discover = () => {
  // State untuk menyimpan teks pencarian
  const [searchText, setSearchText] = useState('');
  // State untuk menyimpan kategori yang aktif/dipilih
  const [activeKategori, setActiveKategori] = useState('Semua');

   // PENERAPAN ANIMASI — useRef + Animated.Value
 
  // Membuat nilai awal scrollY = 0 menggunakan useRef
  // agar tidak terbuat ulang saat komponen re-render
  const scrollY = useRef(new Animated.Value(0)).current;

  // diffClamp membatasi nilai antara 0 dan 110
  // (tinggi area kategori filter yang akan disembunyikan)
  const diffClampY = Animated.diffClamp(scrollY, 0, 110);

  // Interpolasi kategori — bergerak ke atas saat scroll turun
  // inputRange [0, 110] dipetakan ke outputRange [0, -110]
  const kategoriY = diffClampY.interpolate({
    inputRange: [0, 110],
    outputRange: [0, -110],
    extrapolate: 'clamp',
  });

  // Filter data berdasarkan teks pencarian dan kategori aktif
  const filteredData = wisataData.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    const matchKategori = activeKategori === 'Semua' || item.kategori === activeKategori;
    return matchSearch && matchKategori;
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header Search — posisi tetap di atas, tidak beranimasi */}
      <View style={styles.header}>
        <Text style={styles.title}>Temukan Wisata 🔍</Text>

        {/* Search bar menggunakan flexDirection row */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔎</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari tempat wisata Sumba..."
            placeholderTextColor={colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Kategori Filter — Animated.View agar bisa bergerak ke atas saat scroll */}
      <Animated.View
        style={[styles.kategoriContainer, { transform: [{ translateY: kategoriY }] }]}
      >
        {/* ScrollView horizontal untuk kategori */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.kategoriContent}
        >
          {/* Tombol kategori Semua */}
          <TouchableOpacity
            style={[styles.kategoriBtn, activeKategori === 'Semua' && styles.kategoriBtnActive]}
            onPress={() => setActiveKategori('Semua')}
          >
            <Text style={[styles.kategoriText, activeKategori === 'Semua' && styles.kategoriTextActive]}>
              Semua
            </Text>
          </TouchableOpacity>

          {/* Tombol per kategori wisata */}
          {kategoriData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.kategoriBtn, activeKategori === item.label && styles.kategoriBtnActive]}
              onPress={() => setActiveKategori(item.label)}
            >
              <Text style={[styles.kategoriText, activeKategori === item.label && styles.kategoriTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      {/* List Wisata — Animated.ScrollView untuk menangkap event scroll */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
      >
        {/* Tampilkan data wisata yang sudah difilter */}
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ItemWisata key={item.id} item={item} />
          ))
        ) : (
          // Tampilkan pesan jika tidak ada wisata yang ditemukan
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Wisata tidak ditemukan 😕</Text>
          </View>
        )}
      </Animated.ScrollView>

    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  // Container utama halaman
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header tetap di atas — tidak beranimasi
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.background,
    zIndex: 1000,
    gap: 12,
  },
  // Judul halaman Temukan Wisata
  title: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  // Search bar — flexDirection row (ikon + input)
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 2,
    gap: 8,
  },
  // Ikon kaca pembesar
  searchIcon: {
    fontSize: 16,
  },
  // Input teks pencarian
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  // Kategori container — position absolute agar bisa ditimpa konten scroll
  kategoriContainer: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    zIndex: 999,
    paddingVertical: 10,
    elevation: 999,
  },
  // Konten scroll kategori horizontal
  kategoriContent: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  // Tombol kategori — tidak aktif
  kategoriBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.accent,
    marginRight: 8,
  },
  // Tombol kategori — aktif/dipilih
  kategoriBtnActive: {
    backgroundColor: colors.primary,
  },
  // Teks kategori — tidak aktif
  kategoriText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  // Teks kategori — aktif/dipilih
  kategoriTextActive: {
    color: colors.white,
  },
  // Konten list wisata — paddingTop agar tidak tertutup kategori
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 220,
    paddingBottom: 40,
    gap: 12,
  },
  // Container pesan kosong
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  // Teks pesan wisata tidak ditemukan
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
});