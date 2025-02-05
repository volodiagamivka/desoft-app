
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import HomeScreen from './HomeScreen';


export default function App() {
  const [fontsLoaded] = useFonts({
    'DINCondensed': require('../assets/fonts/DINCondensed-Bold.ttf'),
    'DINCondensed-Light': require('../assets/fonts/DINCondensed-Light.ttf'),
  });
  return (
    <HomeScreen/>
  );
}
