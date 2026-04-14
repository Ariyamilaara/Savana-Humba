import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors, fonts } from '../theme';

// Komponen ItemWisata — kartu wisata horizontal (foto kiri, info kanan)
// Menerapkan Flexbox: flexDirection row
const ItemWisata = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => Alert.alert('SavanaHumba', `Membuka: ${item.title}`)}
    >
      {/* Foto di kiri */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Info di kanan — flexDirection column (default) */}
      <View style={styles.info}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.kategori}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        {/* Lokasi — flexDirection row */}
        <View style={styles.lokasiRow}>
          <Text style={styles.lokasiIcon}>📍</Text>
          <Text style={styles.lokasi}>{item.lokasi}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemWisata;

const styles = StyleSheet.create({
  // Card menggunakan flexDirection row — foto kiri, info kanan
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    height: 110,
    marginBottom: 4,
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
  // Badge kategori — flexDirection row
  badgeRow: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  title: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.bold,
    lineHeight: 20,
  },
  // Lokasi menggunakan flexDirection row
  lokasiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lokasiIcon: {
    fontSize: 11,
  },
  lokasi: {
    fontSize: 11,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
});