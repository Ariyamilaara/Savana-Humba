import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

// Data artikel wisata Sumba
const dummyData = [
  {
    id: '1',
    title: 'Mengenal Savana Sumba yang Eksotis',
    category: 'Alam',
    image: 'https://i.pinimg.com/736x/10/e8/5e/10e85ec271bbc9abba77b615ec771a27.jpg',
    createdAt: '01 Apr, 2026',
    totalLikes: 2300,
    totalComments: 89,
    content: `Pulau Sumba menyimpan keindahan alam yang luar biasa, salah satunya adalah hamparan savana yang luas dan eksotis. Berbeda dengan pulau-pulau lain di Indonesia yang didominasi hutan tropis, Sumba memiliki lansekap padang rumput kekuningan yang membentang hingga tepi pantai dan perbukitan.

Savana Puru Kambera di Sumba Timur adalah salah satu yang paling terkenal. Di sini, kuda-kuda liar berlarian bebas di antara pohon lontar yang menjulang, menciptakan pemandangan yang seolah berasal dari film dokumenter Afrika. Cahaya matahari sore yang keemasan membuat savana ini tampak semakin memukau.

Selain Puru Kambera, masih banyak hamparan savana indah lainnya di Sumba yang belum banyak diketahui wisatawan. Inilah yang membuat Sumba menjadi destinasi wisata tersembunyi yang wajib dikunjungi bagi para pecinta alam dan fotografer.`,
  },
  {
    id: '2',
    title: 'Wisata Budaya Sumba yang Kaya',
    category: 'Budaya',
    image: 'https://i.pinimg.com/736x/98/ac/6c/98ac6cf2c3561de99c75d96f3ece9ec3.jpg',
    createdAt: '28 Mar, 2026',
    totalLikes: 1800,
    totalComments: 65,
    content: `Sumba adalah pulau dengan kekayaan budaya yang sangat dalam dan unik. Masyarakat Sumba masih menjaga tradisi leluhur mereka dengan sangat kuat, mulai dari upacara adat, tenunan ikat, hingga sistem kepercayaan Marapu yang telah ada jauh sebelum agama-agama besar masuk ke pulau ini.

Salah satu tradisi paling spektakuler di Sumba adalah Pasola, sebuah ritual perang berkuda yang diadakan setiap tahun sebagai bagian dari perayaan panen. Dua kelompok penunggang kuda saling melempar lembing kayu dengan penuh semangat, disaksikan oleh ribuan penonton yang memenuhi padang luas.

Rumah adat Sumba yang disebut Uma Mbatangu juga menjadi daya tarik tersendiri. Rumah berbentuk kerucut tinggi ini bukan sekadar tempat tinggal, melainkan simbol kosmologi dan hierarki sosial masyarakat Sumba yang kaya makna.`,
  },
  {
    id: '3',
    title: 'Kuliner Khas Sumba Wajib Dicoba',
    category: 'Kuliner',
    image: 'https://i.pinimg.com/736x/45/9f/47/459f470f7e3df2f5bd4b845974a907f2.jpg',
    createdAt: '20 Mar, 2026',
    totalLikes: 1200,
    totalComments: 43,
    content: `Kuliner Sumba menawarkan cita rasa yang autentik dan berbeda dari daerah lain di Indonesia. Makanan khas Sumba umumnya menggunakan bahan-bahan lokal seperti jagung, daging babi, ayam kampung, dan hasil laut segar yang diolah dengan cara tradisional.

Se'i adalah salah satu kuliner paling ikonik dari Sumba. Daging sapi atau babi yang diasap dengan kayu kosambi ini memiliki aroma dan rasa yang khas, tidak bisa ditemukan di tempat lain. Se'i biasanya disajikan dengan sambal luat yang pedas dan sayuran segar.

Selain Se'i, ada juga Jawada yaitu kue tradisional yang terbuat dari tepung beras dan gula aren, serta Manggulu yaitu dodol khas Sumba yang terbuat dari pisang dan kacang tanah. Semua kuliner ini wajib dicoba saat mengunjungi Pulau Sumba.`,
  },
];

// Fungsi format angka (1200 → 1.2K)
const formatNumber = (number) => {
  if (number >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return number.toString();
};

// Komponen BlogDetail — halaman detail artikel wisata
// Menerima route.params berisi blogId dari Stack Navigator
const BlogDetail = ({ route }) => {
  const { blogId } = route.params;
  const navigation = useNavigation();

  // State untuk like, bookmark, dan share
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // PENERAPAN ANIMASI
  
  // Membuat nilai awal scrollY = 0 menggunakan useRef
  // agar tidak terbuat ulang saat komponen re-render
  const scrollY = useRef(new Animated.Value(0)).current;

  // diffClamp membatasi nilai scrollY antara 0 dan 52
  // agar animasi tidak bergerak melebihi batas header
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);

  // Interpolasi untuk header — bergerak ke atas saat scroll turun
  // inputRange [0, 52] dipetakan ke outputRange [0, -52]
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
    extrapolate: 'clamp',
  });

  // Interpolasi untuk bottomBar — bergerak ke bawah saat scroll turun
  // inputRange [0, 52] dipetakan ke outputRange [0, 52]
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
    extrapolate: 'clamp',
  });

  // Cari artikel berdasarkan blogId
  const selectedBlog = dummyData.find((blog) => blog.id === blogId);
  if (!selectedBlog) return null;

  return (
    <SafeAreaView style={styles.container}>

      {/* Header — menggunakan Animated.View agar bisa bergerak saat scroll */}
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerY }] }]}
      >
        {/* Tombol kembali ke halaman sebelumnya */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>

        {/* Judul halaman */}
        <Text style={styles.headerTitle}>Detail Artikel</Text>

        {/* Tombol bookmark — toggle simpan/hapus */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            setIsBookmarked(!isBookmarked);
            Alert.alert(
              'SavanaHumba',
              isBookmarked ? 'Artikel dihapus dari bookmark' : 'Artikel disimpan ke bookmark! 🔖'
            );
          }}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isBookmarked ? colors.primary : colors.text}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Animated.ScrollView — menangkap event scroll untuk menggerakkan animasi */}
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
        <Image source={{ uri: selectedBlog.image }} style={styles.image} />

        {/* Meta info — kategori dan tanggal */}
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedBlog.category}</Text>
          </View>
          <Text style={styles.date}>📅 {selectedBlog.createdAt}</Text>
        </View>

        {/* Judul artikel */}
        <Text style={styles.title}>{selectedBlog.title}</Text>

        {/* Garis pemisah */}
        <View style={styles.divider} />

        {/* Isi artikel */}
        <Text style={styles.content}>{selectedBlog.content}</Text>
      </Animated.ScrollView>

      {/* Bottom bar — menggunakan Animated.View agar bisa bergerak saat scroll */}
      <Animated.View
        style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}
      >
        {/* Tombol Like — toggle merah/abu */}
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
              ? formatNumber(selectedBlog.totalLikes + 1)
              : formatNumber(selectedBlog.totalLikes)}
          </Text>
        </TouchableOpacity>

        {/* Tombol Komentar — menampilkan Alert fitur segera hadir */}
        <TouchableOpacity
          style={styles.interactionItem}
          onPress={() => Alert.alert('SavanaHumba', 'Fitur komentar segera hadir! 💬')}
        >
          <Ionicons name="chatbubble-outline" size={24} color={colors.textLight} />
          <Text style={styles.interactionText}>
            {formatNumber(selectedBlog.totalComments)}
          </Text>
        </TouchableOpacity>

        {/* Tombol Share — toggle ikon dan tampilkan Alert */}
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
  // Container utama halaman
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header — position absolute agar bisa ditimpa konten scroll
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
  // Tombol kembali dan bookmark
  backBtn: {
    padding: 4,
  },
  // Judul header
  headerTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  // Padding konten scroll agar tidak tertutup header dan bottomBar
  scrollContent: {
    paddingTop: 62,
    paddingBottom: 120,
  },
  // Foto artikel full width
  image: {
    width: '100%',
    height: 240,
  },
  // Baris meta — kategori dan tanggal
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  // Badge kategori
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
  // Teks tanggal
  date: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  // Judul artikel
  title: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.extraBold,
    paddingHorizontal: 20,
    marginTop: 12,
    lineHeight: 28,
  },
  // Garis pemisah
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  // Isi artikel
  content: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  // Bottom bar — position absolute agar bisa bergerak dengan animasi
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
  // Item interaksi — like, komentar, share
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  // Teks jumlah like/komentar
  interactionText: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.semiBold,
  },
});