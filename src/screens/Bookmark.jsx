import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { colors, fonts } from '../theme';

// Data bookmark wisata Sumba
const bookmarkData = [
  { id: '1', title: 'Pantai Nihiwatu', kategori: 'Pantai', tanggal: '01 Apr, 2026', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: '2', title: 'Savana Puru Kambera', kategori: 'Savana', tanggal: '28 Mar, 2026', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
  { id: '3', title: 'Air Terjun Lapopu', kategori: 'Air Terjun', tanggal: '20 Mar, 2026', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400' },
  { id: '4', title: 'Kampung Adat Ratenggaro', kategori: 'Budaya', tanggal: '15 Mar, 2026', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400' },
];

// Komponen Bookmark — halaman daftar wisata yang disimpan
const Bookmark = () => {
  // State untuk menyimpan daftar bookmark
  const [bookmarks, setBookmarks] = useState(bookmarkData);

  // Fungsi hapus bookmark
  const handleHapus = (id) => {
    Alert.alert(
      'Hapus Bookmark',
      'Yakin ingin menghapus wisata ini dari bookmark?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => setBookmarks(bookmarks.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header — flexDirection row, justifyContent space-between */}
      <View style={styles.header}>
        <Text style={styles.title}>Bookmark Saya 🔖</Text>
        <Text style={styles.count}>{bookmarks.length} wisata</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {bookmarks.length > 0 ? (
          bookmarks.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              {/* Info menggunakan flexDirection column */}
              <View style={styles.info}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.kategori}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                {/* Baris bawah — flexDirection row */}
                <View style={styles.bottomRow}>
                  <Text style={styles.tanggal}>📅 {item.tanggal}</Text>
                  <TouchableOpacity onPress={() => handleHapus(item.id)}>
                    <Text style={styles.hapus}>🗑️ Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔖</Text>
            <Text style={styles.emptyTitle}>Belum ada bookmark</Text>
            <Text style={styles.emptySubtitle}>Simpan wisata favoritmu di sini</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header menggunakan flexDirection row
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  count: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  // Card menggunakan flexDirection row
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    marginBottom: 4,
    height: 120,
  },
  image: {
    width: 110,
    height: '100%',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  // Baris bawah menggunakan flexDirection row
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tanggal: {
    fontSize: 11,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  hapus: {
    fontSize: 11,
    color: '#E74C3C',
    fontFamily: fonts.semiBold,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 18,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
});