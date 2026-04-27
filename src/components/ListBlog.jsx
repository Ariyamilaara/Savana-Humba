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

// Hapus useNavigation dari sini — navigasi dikirim lewat props onReadMore
const ListBlog = ({ title, category, image, isLiked, onPress, onReadMore, onLike }) => {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{category}</Text>
          <TouchableOpacity onPress={onLike}>
            <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
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
    borderColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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