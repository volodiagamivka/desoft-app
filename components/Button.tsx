import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  width?: number | string;
  height?: number;
  fontSize?: number;
  center?: boolean;  // Додаємо нову властивість для центрованого розміщення
}

export default function CustomButton({ onPress, title, width = '100%', height = 50, fontSize = 16, center = false }: ButtonProps) {
  return (
    <View style={[center && styles.center, { width: width, height: height }]}>
      <TouchableOpacity
        style={[styles.button, { width: width, height: height }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { fontSize: fontSize }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E6C081',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#3A3935',
    fontFamily: 'DINCondensed',
    fontWeight: 700,
  },
  center: {
    flex: -1,  // Це дозволить розмістити кнопку по центру батьківського контейнера
    justifyContent: 'center',
    alignItems: 'center',
  }
});
