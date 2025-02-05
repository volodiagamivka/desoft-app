import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import CustomButton from '@/components/Button';
import { useRouter } from 'expo-router';  

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const fontSize = width < 375 ? 20 : 30;  // Адаптивний розмір шрифта для різних екранів
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Логотип */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo_white.png')} style={styles.logo} />
        </View>

        {/* Контент */}
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize }]}>ДЛЯ ПОЧАТКУ ЕКСКУРСІЇ ОПЛАТІТЬ АБО ВВЕДІТЬ КОД АКТИВАЦІЇ</Text>

          {/* Кнопка для переходу до оплати */}
          <CustomButton 
            title='Перейти до оплати' 
            onPress={() => router.push('/PayingScreen')} 
            width={210} 
            height={50} 
            fontSize={20}
          />
          
          {/* Кнопка для введення коду */}
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/AuthScreen')}>
            <Text style={styles.secondaryButtonText}>Ввести код</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, // Додаємо відстань між логотипом і текстом
  },
  logo: {
    width: 50.5,
    height: 57,
  },
  content: {
    marginTop: 50, // Відстань від логотипу до тексту та кнопок
    alignItems: 'center',
    width: '90%',
  },
  title: {
    color: '#E7E4E2',
    fontSize: 40,
    letterSpacing: 0.8,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 48,
    marginBottom: 50,
    fontFamily: 'DINCondensed',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: 'DINCondensed',
  },
});
