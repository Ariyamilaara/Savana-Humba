import React from 'react';

// Mengimpor komponen UI bawaan React Native yang dibutuhkan
import {
  View,             // Komponen container/pembungkus layout
  Text,             // Komponen untuk menampilkan teks
  Image,            // Komponen untuk menampilkan gambar/foto
  StyleSheet,       // Digunakan untuk membuat styling
  TouchableOpacity, // Komponen tombol yang bisa ditekan dengan efek opacity
  Button,           // Komponen tombol bawaan React Native
} from 'react-native';

// Mengimpor konfigurasi warna dan font dari folder theme
import { colors, fonts } from '../theme';

// Komponen ListBlog — menampilkan satu kartu artikel wisata
// Menerima props: title, category, image, onPress, onReadMore
const ListBlog = ({ title, category, image, onPress, onReadMore }) => {
  return (
    // TouchableOpacity membuat seluruh kartu bisa ditekan
    // activeOpacity mengatur tingkat transparansi saat ditekan
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>

      {/* Menampilkan foto wisata dari link URL */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Bagian informasi teks di bawah foto */}
      <View style={styles.info}>

        {/* Menampilkan kategori artikel (Alam / Budaya / Kuliner) */}
        <Text style={styles.category}>{category}</Text>

        {/* Menampilkan judul artikel */}
        <Text style={styles.title}>{title}</Text>

        {/* Pembungkus tombol agar borderRadius bisa diterapkan */}
        <View style={styles.buttonWrapper}>
          {/* Tombol "Baca Selengkapnya" — memanggil fungsi onReadMore saat ditekan */}
          <Button
            title="Baca Selengkapnya"
            color={colors.primary} // Warna tombol menggunakan warna primary dari theme
            onPress={onReadMore}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// StyleSheet untuk mengatur tampilan komponen kartu blog
const styles = StyleSheet.create({
  // Style untuk kartu/card keseluruhan
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,      // Sudut kartu melengkung
    marginBottom: 20,      // Jarak antar kartu
    overflow: 'hidden',    // Memastikan konten tidak keluar dari batas kartu
    elevation: 4,          // Bayangan kartu (Android)
    shadowColor: '#000',   // Warna bayangan (iOS)
    shadowOpacity: 0.08,   // Transparansi bayangan (iOS)
    shadowRadius: 8,       // Ukuran bayangan (iOS)
  },
  // Style untuk foto wisata
  image: {
    width: '100%',   // Lebar penuh mengikuti kartu
    height: 180,     // Tinggi foto tetap 180px
  },
  // Style untuk area informasi teks di bawah foto
  info: {
    padding: 14,
  },
  // Style untuk teks kategori (ALAM / BUDAYA / KULINER)
  category: {
    fontSize: 11,
    color: colors.secondary,
    fontFamily: fonts.semiBold,
    marginBottom: 4,
    textTransform: 'uppercase', // Huruf kapital semua
    letterSpacing: 1,           // Jarak antar huruf
  },
  // Style untuk teks judul artikel
  title: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
    marginBottom: 12,
    lineHeight: 22, // Jarak antar baris teks
  },
  // Style untuk pembungkus tombol
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden', // Agar borderRadius tombol terlihat
  },
});

// Mengekspor komponen agar bisa digunakan di file lain
export default ListBlog;
