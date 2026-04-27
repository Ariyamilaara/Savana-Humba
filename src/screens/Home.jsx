import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import ListBlog from '../components/ListBlog';
import { colors, fonts } from '../theme';

const dummyData = [
  {
    id: '1',
    title: 'Mengenal Savana Sumba yang Eksotis',
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

const Home = () => {
  const navigation = useNavigation(); // aman di sini karena Home sudah di dalam NavigationContainer
  const [likedIds, setLikedIds] = useState([]);
  const [readCount, setReadCount] = useState(0);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const handleLike = (id) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
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
          <Text style={styles.readInfo}>📖 Artikel dibaca: {readCount}</Text>
        </View>

        {/* List Blog */}
        {dummyData.map((item) => (
          <ListBlog
            key={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            isLiked={likedIds.includes(item.id)}
            // onPress dan onReadMore keduanya navigasi ke BlogDetail
            onPress={() => navigation.navigate('BlogDetail', { blogId: item.id })}
            onReadMore={() => {
              setReadCount(readCount + 1);
              navigation.navigate('BlogDetail', { blogId: item.id });
            }}
            onLike={() => handleLike(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
  readInfo: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.semiBold,
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});