import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import ListBlog from './src/components/ListBlog';
import { colors, fonts } from './src/theme';

const dummyData = [
  {
    id: '1',
    title: 'Mengenal Keindahan Alam Sumba yang Eksotis',
    category: 'Alam',
    image: 'https://i.pinimg.com/736x/10/e8/5e/10e85ec271bbc9abba77b615ec771a27.jpg',
  },
  {
    id: '2',
    title: 'Wisata Budaya Sumba yang Kaya',
    category: 'Budaya',
    image: 'https://i.pinimg.com/736x/98/ac/6c/98ac6cf2c3561de99c75d96f3ece9ec3.jpg',
  },
  {
    id: '3',
    title: 'Kuliner Khas Sumba Wajib Dicoba',
    category: 'Kuliner',
    image: 'https://i.pinimg.com/736x/45/9f/47/459f470f7e3df2f5bd4b845974a907f2.jpg',
  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const handleReadMore = (title) => {
    Alert.alert('SavanaHumba', `Membuka artikel: ${title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Datang 👋</Text>
          <Text style={styles.appName}>SavanaHumba</Text>
          <Text style={styles.subtitle}>Jelajahi keindahan alam & budaya Sumba</Text>
        </View>

        {/* List Blog */}
        {dummyData.map((item) => (
          <ListBlog
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            onPress={() => handleReadMore(item.title)}
            onReadMore={() => handleReadMore(item.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  appName: {
    fontSize: 30,
    color: colors.primary,
    fontFamily: fonts.extraBold,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
    marginTop: 4,
  },
});