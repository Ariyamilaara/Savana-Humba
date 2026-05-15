import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

// Data kategori artikel
const dataKategori = [
  { id: 1, nama: 'Alam' },
  { id: 2, nama: 'Budaya' },
  { id: 3, nama: 'Kuliner' },
];

// Komponen TambahArtikel — form untuk menambah artikel wisata baru
const TambahArtikel = () => {
  const navigation = useNavigation();

  // State menyimpan semua data form dalam satu objek
  const [artikelData, setArtikelData] = useState({
    judul: '',
    kategori: {},
    deskripsi: '',
    imageUrl: '',
  });

  // Fungsi handleChange — update field tertentu di state artikelData
  const handleChange = (key, value) => {
    setArtikelData({ ...artikelData, [key]: value });
  };

  // Fungsi validasi — cek semua field sudah diisi
  const handleSimpan = () => {
    if (
      !artikelData.judul ||
      !artikelData.deskripsi ||
      !artikelData.imageUrl ||
      !artikelData.kategori.id
    ) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }
    // Tampilkan data yang berhasil diisi
    Alert.alert(
      'Berhasil! ✅',
      `Artikel "${artikelData.judul}" berhasil ditambahkan!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
    // Reset form setelah simpan
    setArtikelData({ judul: '', kategori: {}, deskripsi: '', imageUrl: '' });
  };

  // ==============================
  // ANIMASI — header & bottomBar
  // ==============================
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);

  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
    extrapolate: 'clamp',
  });

  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header animasi */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Artikel</Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      {/* Konten form — Animated.ScrollView untuk animasi */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Input Judul */}
        <Text style={styles.label}>Judul Artikel</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Masukkan judul artikel..."
            placeholderTextColor={colors.textLight}
            value={artikelData.judul}
            onChangeText={(text) => handleChange('judul', text)}
            multiline
          />
        </View>

        {/* Pilih Kategori */}
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.kategoriRow}>
          {dataKategori.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.kategoriBtn,
                artikelData.kategori.id === item.id && styles.kategoriBtnActive,
              ]}
              onPress={() => handleChange('kategori', { id: item.id, nama: item.nama })}
            >
              <Text
                style={[
                  styles.kategoriText,
                  artikelData.kategori.id === item.id && styles.kategoriTextActive,
                ]}
              >
                {item.nama}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input Deskripsi */}
        <Text style={styles.label}>Deskripsi</Text>
        <View style={[styles.inputWrapper, { minHeight: 120 }]}>
          <TextInput
            style={[styles.input, { textAlignVertical: 'top' }]}
            placeholder="Tulis deskripsi artikel..."
            placeholderTextColor={colors.textLight}
            value={artikelData.deskripsi}
            onChangeText={(text) => handleChange('deskripsi', text)}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Input URL Gambar */}
        <Text style={styles.label}>URL Gambar</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Masukkan link foto..."
            placeholderTextColor={colors.textLight}
            value={artikelData.imageUrl}
            onChangeText={(text) => handleChange('imageUrl', text)}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        {/* Preview data yang diisi */}
        {artikelData.judul !== '' && (
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>Preview Data 👀</Text>
            <Text style={styles.previewText}>
              Judul: {artikelData.judul}
            </Text>
            <Text style={styles.previewText}>
              Kategori: {artikelData.kategori.nama || '-'}
            </Text>
            <Text style={styles.previewText} numberOfLines={2}>
              Deskripsi: {artikelData.deskripsi || '-'}
            </Text>
          </View>
        )}

      </Animated.ScrollView>

      {/* Bottom bar — tombol simpan dengan animasi */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity style={styles.btnSimpan} onPress={handleSimpan}>
          <Text style={styles.btnSimpanText}>Simpan Artikel</Text>
        </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>
  );
};

export default TambahArtikel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header animasi
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 52,
  },
  headerTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 100,
    gap: 6,
  },
  // Label field
  label: {
    fontSize: 13,
    color: colors.text,
    fontFamily: fonts.semiBold,
    marginTop: 12,
    marginBottom: 6,
  },
  // Wrapper input dengan border
  inputWrapper: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  // Style TextInput
  input: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,
    minHeight: 44,
  },
  // Baris tombol kategori
  kategoriRow: {
    flexDirection: 'row',
    gap: 10,
  },
  kategoriBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  // Kategori aktif/dipilih
  kategoriBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  kategoriText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  kategoriTextActive: {
    color: colors.white,
  },
  // Box preview data
  previewBox: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    gap: 4,
  },
  previewTitle: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.bold,
    marginBottom: 6,
  },
  previewText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  // Bottom bar tombol simpan
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 1000,
  },
  btnSimpan: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnSimpanText: {
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});