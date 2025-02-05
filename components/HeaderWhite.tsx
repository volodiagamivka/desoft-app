import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Іконки з Ionicons
import { Link } from 'expo-router';
import Logo from '../assets/icons/logo-white.svg';
export default function Header() {

  return (
    <View style={styles.header}>
      <View style={styles.IconContainer}>
        <View style={styles.logoContainer}>
          <Logo width={30} height={33.86}/>
        </View>
        <View style={styles.Righticons}>
          <Link href="https://drohobych-saltworks.com/souvenirs/" style={styles.menuButton}>
            <Ionicons name="bag-outline" size={33} color="#F9F8F8" />
          </Link>
          
          {/* Збільшено відступ між іконками */}
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={35} color="#F9F8F8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft:35,
    paddingRight:35,
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
