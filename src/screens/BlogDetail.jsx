import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { colors, fonts } from '../theme';

// URL API MockAPI SavanaHumba
const API_URL = 'https://6a0ad26921e445625696a97c.mockapi.io/api/artikel';

// Fungsi format angka — tambahkan pengecekan undefined/null
const formatNumber = (number) => {
  if (!number && number !== 0) return '0';
  if (number >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return number.toString();
};

const BlogDetail = ({ route }) => {
  const { blogId } = route.params;
  const navigation = useNavigation();

  // State data artikel dari API
  const [selectedBlog, setSelectedBlog] = useState(null);
  // State loading saat fetch data
  const [fetchLoading, setFetchLoading] = useState(true);
  // State loading saat hapus artikel
  const [loadingHapus, setLoadingHapus] = useState(false);

  // State untuk interaksi
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Animasi scrollY
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

  // Fungsi GET — ambil data artikel dari API berdasarkan blogId
  useEffect(() => {
    const fetchArtikel = async () => {
      setFetchLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${blogId}`);
        setSelectedBlog(response.data);
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat artikel!');
      } finally {
        setFetchLoading(false);
      }
    };
    if (blogId) fetchArtikel();
  }, [blogId]);

  // Fungsi DELETE — hapus artikel dari API
  const handleHapus = () => {
    Alert.alert(
      'Hapus Artikel',
      'Yakin ingin menghapus artikel ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            setLoadingHapus(true);
            try {
              await axios.delete(`${API_URL}/${blogId}`);
              Alert.alert('Berhasil', 'Artikel berhasil dihapus! 🗑️');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus artikel!');
            } finally {
              setLoadingHapus(false);
            }
          },
        },
      ]
    );
  };

  // Tampilkan loading saat data belum siap
  if (fetchLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Jika artikel tidak ditemukan
  if (!selectedBlog) return null;

  return (
    <SafeAreaView style={styles.container}>

      {/* Header animasi */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        {/* Tombol kembali */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Artikel</Text>

        {/* Tombol edit dan hapus */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('EditArtikel', { blogId })}
          >
            <Ionicons name="create-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} onPress={handleHapus}>
            {loadingHapus ? (
              <ActivityIndicator size="small" color="#E74C3C" />
            ) : (
              <Ionicons name="trash-outline" size={22} color="#E74C3C" />
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Konten artikel */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Foto artikel */}
        <Image
          source={{ uri: selectedBlog.image }}
          style={styles.image}
          defaultSource={{ uri: 'https://via.placeholder.com/400x240' }}
        />

        {/* Meta info */}
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedBlog.category || '-'}</Text>
          </View>
          <Text style={styles.date}>📅 {selectedBlog.createdAt || '-'}</Text>
        </View>

        {/* Judul */}
        <Text style={styles.title}>{selectedBlog.title || '-'}</Text>
        <View style={styles.divider} />

        {/* Deskripsi */}
        <Text style={styles.content}>{selectedBlog.description || 'Tidak ada deskripsi.'}</Text>
      </Animated.ScrollView>

      {/* Bottom bar */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>

        {/* Tombol Like */}
        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => setIsLiked(!isLiked)}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? '#E74C3C' : colors.textLight}
          />
          <Text style={[styles.interactionText, isLiked && { color: '#E74C3C' }]}>
            {isLiked
              ? formatNumber((selectedBlog.totalLikes || 0) + 1)
              : formatNumber(selectedBlog.totalLikes || 0)}
          </Text>
        </TouchableOpacity>

        {/* Tombol Komentar */}
        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => Alert.alert('SavanaHumba', 'Fitur komentar segera hadir! 💬')}
        >
          <Ionicons name="chatbubble-outline" size={24} color={colors.textLight} />
          <Text style={styles.interactionText}>
            {formatNumber(selectedBlog.totalComments || 0)}
          </Text>
        </TouchableOpacity>

        {/* Tombol Share */}
        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => {
            setIsShared(!isShared);
            Alert.alert('SavanaHumba', 'Artikel berhasil dibagikan! 🚀');
          }}
        >
          <Ionicons
            name={isShared ? 'share-social' : 'share-social-outline'}
            size={24}
            color={isShared ? colors.primary : colors.textLight}
          />
        </TouchableOpacity>

      </Animated.View>
    </SafeAreaView>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    paddingTop: 62,
    paddingBottom: 120,
  },
  image: {
    width: '100%',
    height: 240,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  title: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.extraBold,
    paddingHorizontal: 20,
    marginTop: 12,
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  content: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 1000,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interactionText: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.semiBold,
  },
});