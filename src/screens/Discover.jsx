import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
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
  { id: '1', title: 'Pantai Nihiwatu', kategori: 'Pantai', lokasi: 'Sumba Barat', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: '2', title: 'Savana Puru Kambera', kategori: 'Savana', lokasi: 'Sumba Timur', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
  { id: '3', title: 'Air Terjun Lapopu', kategori: 'Air Terjun', lokasi: 'Sumba Barat', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400' },
  { id: '4', title: 'Kampung Adat Ratenggaro', kategori: 'Budaya', lokasi: 'Sumba Barat', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400' },
  { id: '5', title: 'Pantai Walakiri', kategori: 'Pantai', lokasi: 'Sumba Timur', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
  { id: '6', title: 'Kuliner Se\'i Babi Sumba', kategori: 'Kuliner', lokasi: 'Waingapu', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
];

// Komponen Discover — halaman pencarian wisata Sumba
const Discover = () => {
  // State untuk menyimpan teks pencarian
  const [searchText, setSearchText] = useState('');
  // State untuk menyimpan kategori yang dipilih
  const [activeKategori, setActiveKategori] = useState('Semua');

  // Filter data berdasarkan pencarian dan kategori
  const filteredData = wisataData.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    const matchKategori = activeKategori === 'Semua' || item.kategori === activeKategori;
    return matchSearch && matchKategori;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Temukan Wisata 🔍</Text>
        {/* Search Bar — flexDirection row (horizontal) */}
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

      {/* Kategori Filter — flexDirection row dengan flexWrap */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.kategoriScroll}
        contentContainerStyle={styles.kategoriContent}
      >
        {/* Tombol Semua */}
        <TouchableOpacity
          style={[styles.kategoriBtn, activeKategori === 'Semua' && styles.kategoriBtnActive]}
          onPress={() => setActiveKategori('Semua')}
        >
          <Text style={[styles.kategoriText, activeKategori === 'Semua' && styles.kategoriTextActive]}>
            Semua
          </Text>
        </TouchableOpacity>

        {/* Tombol per kategori */}
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
      </ScrollView>

      {/* List Wisata */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ItemWisata key={item.id} item={item} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Wisata tidak ditemukan 😕</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  // Search bar menggunakan flexDirection row
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
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  kategoriScroll: {
    maxHeight: 50,
  },
  kategoriContent: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  kategoriBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.accent,
    marginRight: 8,
  },
  kategoriBtnActive: {
    backgroundColor: colors.primary,
  },
  kategoriText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  kategoriTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
});