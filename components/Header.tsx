import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Іконки з Ionicons
import { useRouter,useNavigation } from 'expo-router'; // Для роботи з маршрутом
import { Link } from 'expo-router';

export default function Header() {
  const router = useRouter();
  const [iconColor, setIconColor] = useState('#000'); // Початковий колір іконок
  const navigation=useNavigation();
  // Функція для зміни кольору іконок в залежності від сторінки
  useEffect(() => {
    const { pathname } = router;  // Отримуємо поточний шлях

    if (pathname === '/HomeScreen') {
      setIconColor('#FF6347');  // Наприклад, для домашньої сторінки обираємо червоний
    } else if (pathname === '/') {
      setIconColor('#00BFFF');  // Для профілю вибираємо блакитний
    } else {
      setIconColor('#000');  // За замовчуванням чорний
    }
  }, [router]);

  return (
    <View style={styles.header}>
      <View style={styles.IconContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo-black.png')} style={styles.logo} />
        </View>
        <View style={styles.Righticons}>
          <Link href="https://drohobych-saltworks.com/souvenirs/" style={styles.menuButton}>
            <Ionicons name="bag-outline" size={33} color="#3A3935" />
          </Link>
          
          {/* Збільшено відступ між іконками */}
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={35} color="#3A3935" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    zIndex: 1,
   
  },
  logo: {
    width: 30,
    height: 33,
  },
  IconContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Центруємо по вертикалі
    justifyContent: 'space-between',
    paddingTop: 60,
    
  },
  Righticons: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Додаємо розподіл між іконками
    width: 80,  // Фіксована ширина, щоб збільшити відстань між іконками
  },
  menuButton: {
    marginLeft: 10,  // Встановлюємо відступ між іконками
  },
});
