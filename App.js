import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { Ionicons } from '@expo/vector-icons';

// Import semua screen
import Home from './src/screens/Home';
import Discover from './src/screens/Discover';
import Bookmark from './src/screens/Bookmark';
import Profile from './src/screens/Profile';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
            paddingBottom: 20,
            paddingTop: 6,
            height: 75,
          },
          tabBarLabelStyle: {
            fontSize: 11,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ focused, color, size }) => (
              // Ikon home — outline saat tidak aktif, solid saat aktif
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarLabel: 'Temukan',
            tabBarIcon: ({ focused, color, size }) => (
              // Ikon search — seperti Instagram
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarLabel: 'Bookmark',
            tabBarIcon: ({ focused, color, size }) => (
              // Ikon bookmark — outline saat tidak aktif, solid saat aktif
              <Ionicons
                name={focused ? 'bookmark' : 'bookmark-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ focused, color, size }) => (
              // Ikon profil — seperti Instagram
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}