import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

// Data profil — ganti nama sesuai kamu
const ProfileData = {
  foto: require('../../assets/Arya.jpeg'), // ganti dengan foto kamu
  nama: 'Ariya Milaara',
  bergabung: '01 Jan, 2025',
  artikelDiposting: 12,
};

// Menu pengaturan dengan ikon Ionicons yang simple
const menuData = [
  { id: '1', icon: 'person-outline', label: 'Edit Profil' },
  { id: '2', icon: 'notifications-outline', label: 'Notifikasi' },
  { id: '3', icon: 'language-outline', label: 'Bahasa' },
  { id: '4', icon: 'lock-closed-outline', label: 'Keamanan' },
  { id: '5', icon: 'help-circle-outline', label: 'Bantuan' },
  { id: '6', icon: 'log-out-outline', label: 'Keluar' },
];

// Komponen Profile
const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Saya 👤</Text>
        </View>

        {/* Kartu Profil */}
        <View style={styles.profileSection}>
          {/* Foto Profil */}
          <Image source={ProfileData.foto} style={styles.foto} />
          <Text style={styles.nama}>{ProfileData.nama}</Text>
          <Text style={styles.bergabung}>
            Bergabung sejak {ProfileData.bergabung}
          </Text>

          {/* Statistik — hanya Artikel */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statAngka}>
                {ProfileData.artikelDiposting}
              </Text>
              <Text style={styles.statLabel}>Artikel</Text>
            </View>
          </View>
        </View>

        {/* Menu Pengaturan */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Pengaturan</Text>
          {menuData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() =>
                Alert.alert('SavanaHumba', `Menu: ${item.label}`)
              }
            >
              {/* Kiri — ikon + label */}
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={
                    item.label === 'Keluar' ? '#E74C3C' : colors.primary
                  }
                />
                <Text
                  style={[
                    styles.menuLabel,
                    item.label === 'Keluar' && styles.menuLabelKeluar,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              {/* Kanan — panah */}
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={colors.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  // Kartu profil
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    gap: 6,
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  nama: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.bold,
    marginTop: 4,
  },
  bergabung: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  // Statistik hanya artikel
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statAngka: {
    fontSize: 22,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  // Menu
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  // Label keluar berwarna merah
  menuLabelKeluar: {
    color: '#E74C3C',
  },
});