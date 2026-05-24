import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { colors, fonts } from '../theme';

const API_URL = 'https://6a0ad26921e445625696a97c.mockapi.io/api/artikel';

const dataKategori = [
  { id: 1, nama: 'Alam' },
  { id: 2, nama: 'Budaya' },
  { id: 3, nama: 'Kuliner' },
];

const EditArtikel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { blogId } = route.params; // id artikel yang akan diedit

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // State data artikel yang akan diedit
  const [artikelData, setArtikelData] = useState({
    title: '', category: '', description: '', image: '',
  });

  // Fungsi GET — ambil data artikel berdasarkan id untuk diisi ke form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/${blogId}`);
        setArtikelData({
          title: res.data.title,
          category: res.data.category,
          description: res.data.description,
          image: res.data.image,
        });
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat data artikel!');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

  const handleChange = (key, value) => {
    setArtikelData({ ...artikelData, [key]: value });
  };

  // Fungsi PUT — update data artikel ke API
  const handleUpdate = async () => {
    if (!artikelData.title || !artikelData.description ||
        !artikelData.image || !artikelData.category) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${blogId}`, artikelData, {
        headers: { 'Content-Type': 'application/json' },
      });
      Alert.alert('Berhasil! ✅', 'Artikel berhasil diupdate!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengupdate artikel!');
    } finally {
      setLoading(false);
    }
  };

  // Animasi
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52], outputRange: [0, -52], extrapolate: 'clamp',
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52], outputRange: [0, 52], extrapolate: 'clamp',
  });

  if (fetchLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header animasi */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Artikel</Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      {/* Form edit */}
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
            value={artikelData.title}
            onChangeText={(text) => handleChange('title', text)}
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
                artikelData.category === item.nama && styles.kategoriBtnActive,
              ]}
              onPress={() => handleChange('category', item.nama)}
            >
              <Text style={[
                styles.kategoriText,
                artikelData.category === item.nama && styles.kategoriTextActive,
              ]}>
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
            value={artikelData.description}
            onChangeText={(text) => handleChange('description', text)}
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
            value={artikelData.image}
            onChangeText={(text) => handleChange('image', text)}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>
      </Animated.ScrollView>

      {/* Bottom bar tombol update */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity
          style={[styles.btnUpdate, loading && { opacity: 0.6 }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnUpdateText}>Update Artikel</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

    </SafeAreaView>
  );
};

export default EditArtikel;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.white,
    borderBottomWidth: 1, borderBottomColor: '#eee',
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, height: 52,
  },
  headerTitle: { fontSize: 16, color: colors.text, fontFamily: fonts.bold },
  scrollContent: { paddingHorizontal: 20, paddingTop: 72, paddingBottom: 100, gap: 6 },
  label: { fontSize: 13, color: colors.text, fontFamily: fonts.semiBold, marginTop: 12, marginBottom: 6 },
  inputWrapper: {
    backgroundColor: colors.white, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#e0e0e0', paddingHorizontal: 14, paddingVertical: 10,
  },
  input: { fontSize: 14, color: colors.text, fontFamily: fonts.regular, minHeight: 44 },
  kategoriRow: { flexDirection: 'row', gap: 10 },
  kategoriBtn: {
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20,
    backgroundColor: colors.accent, borderWidth: 1.5, borderColor: 'transparent',
  },
  kategoriBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  kategoriText: { fontSize: 13, color: colors.primary, fontFamily: fonts.semiBold },
  kategoriTextActive: { color: colors.white },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.white, paddingHorizontal: 20,
    paddingVertical: 14, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#eee', zIndex: 1000,
  },
  btnUpdate: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnUpdateText: { fontSize: 15, color: colors.white, fontFamily: fonts.bold },
});