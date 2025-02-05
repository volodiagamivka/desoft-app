import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
export default function PlayButton() {
    const router = useRouter();
    const handleStartTour = () => {
        router.push('/ScannerScreen');  // Перехід на сторінку екскурсії (наприклад, TourScreen)
      };
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.outerCircle} onPress={handleStartTour}>
        <View style={styles.innerCircle}>
          <Image 
            source={require('../assets/images/play.png')}  // Ваше зображення Play
            style={styles.playIcon} 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:80,
    
    
  },
  outerCircle: {
    width: 120,  // Зовнішнє коло
    height: 120,
    borderRadius: 120, // Робимо коло
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Напівпрозорий фон для зовнішнього кола
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D9D9D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 5, // Для Android
  },
  innerCircle: {
    width: 90,  // Внутрішнє коло (менше за розміром)
    height: 90,
    borderRadius: 120, // Внутрішнє коло кругле
    backgroundColor: 'rgba(1, 0, 1, 0)', // Світлий фон для внутрішнього кола
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D9D9D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 5
  },
  playIcon: {
    width: 30,  // Іконка Play
    height: 35,
  },
});
