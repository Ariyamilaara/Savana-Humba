import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { colors, fonts } from '../theme';
// PENERAPAN PROPS
// - title, category, image → data artikel
// - isSelected → apakah artikel ini sedang dipilih (dari state App.js)
// - isLiked → apakah artikel ini di-like (dari state App.js)
// - onPress, onReadMore, onLike → fungsi dari App.js
const ListBlog = ({
  title,
  category,
  image,
  isSelected,  // Props state — artikel dipilih atau tidak
  isLiked,     // Props state — artikel di-like atau tidak
  onPress,
  onReadMore,
  onLike,      // Props fungsi like
}) => {
  return (
    // Jika artikel dipilih (isSelected true), border kartu berubah jadi hijau
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Foto artikel */}
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>

        {/* Baris kategori dan tombol like */}
        <View style={styles.topRow}>
          {/* Menampilkan props category */}
          <Text style={styles.category}>{category}</Text>

          {/* Tombol like — menampilkan ❤️ atau 🤍 berdasarkan props isLiked */}
          <TouchableOpacity onPress={onLike}>
            <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        {/* Menampilkan props title */}
        <Text style={styles.title}>{title}</Text>

        {/* Tombol Baca Selengkapnya */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Baca Selengkapnya"
            color={colors.primary}
            onPress={onReadMore}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  // Style kartu normal
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent', // Border transparan saat tidak dipilih
  },
  // Style kartu saat dipilih — border berubah hijau
  cardSelected: {
    borderColor: colors.primary,  // Border hijau saat artikel dipilih
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 14,
  },
  // Baris atas berisi kategori dan ikon like
  topRow: {
    flexDirection: 'row',         // Susun horizontal
    justifyContent: 'space-between', // Kategori kiri, like kanan
    alignItems: 'center',
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    color: colors.secondary,
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Ikon like (❤️ atau 🤍)
  likeIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
    marginBottom: 12,
    lineHeight: 22,
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
export default ListBlog;
