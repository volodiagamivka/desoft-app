import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import PlayButton from '@/components/PlayButton';  // Ваш компонент PlayButton

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/background-2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo_white.png')} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>ДРОГОБИЦЬКА</Text>
          <Text style={styles.title}>СОЛЕВАРНЯ</Text>
        </View>

        <PlayButton />

        <Text style={styles.starttext}>Почати екскурсію</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Забезпечує, щоб фон займав увесь екран
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Центрує вміст по вертикалі
    alignItems: 'center', // Центрує вміст по горизонталі
    paddingHorizontal: 20, // Додає горизонтальні відступи
  },
  logoContainer: {
    marginBottom: 40, // Відстань між логотипом і текстом
    alignItems: 'center',
  },
  logo: {
    width: 80.7,
    height: 91,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#E7E4E2',
    fontSize: 40,
    letterSpacing: 0.8,
    fontWeight: 'bold',
    fontFamily: 'DINCondensed-Light',
  },
  starttext: {
    fontFamily: 'DINCondensed-Light',
    color: '#E7E4E2',
    fontSize: 23,
    letterSpacing: 2,
    fontWeight: 400,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'transparent', // Без фону для кнопки
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Відстань між кнопкою і текстом
  },
  buttonPressed: {
    opacity: 0.7, // Зменшуємо непрозорість при натисканні
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6C081',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePressed: {
    width: 140, // Збільшуємо коло при натисканні
    height: 140,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: '#fff', // Білий колір іконки
  },
  buttonText: {
    color: '#E7E4E2',
    fontSize: 18,
    fontFamily: 'DINCondensed',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
