import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, AppState, Platform, StatusBar, View ,Dimensions,Alert} from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useNavigation,useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia"; // Для накладки
import * as FileSystem from 'expo-file-system'; // Для роботи з файлами (якщо потрібно)

const { width, height } = Dimensions.get("window");

const innerDimension = 300; // Розмір внутрішнього прямокутника для накладки

const outer = rrect(rect(0, 0, width, height), 0, 0); // Розмір екрану
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2, 
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,  // Закруглені кути
  50
);

export default function ScannerScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null); 

  const qrLock = useRef(false); // Використовуємо для блокування повторного сканування
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();
  const router=useRouter();
  const [data, setData] = useState(null); // Стан для збереження даних з JSON
  const [isScannerActive, setIsScannerActive] = useState(true); 
  // Контролюємо стан сканера

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission required', 'This app requires access to the camera to scan QR codes.');
      }
    };
    requestPermission();
  }, []);
  // Завантаження JSON-файлу
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = require('./data.json');
        setData(jsonData);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = (scannedData) => {
    if (scannedData && !qrLock.current && isScannerActive) {
      qrLock.current = true; // Заблокуємо повторне сканування
      setIsScannerActive(false); // Вимикаємо сканер
      const idQr = scannedData.trim(); // Очищаємо пробіли зчитаного ID
    
      setTimeout(() => {
        try {
          // Перевіряємо, чи існує зчитаний ID в JSON-файлі
          if (data && idQr in data) {
            
            
            // Якщо ID знайдено, переходимо на ObjectScreen і передаємо дані
            router.push({
              pathname: '/ObjectScreen',
              params: {
                audioFileName: data[idQr].audioFileName,
                description: data[idQr].description,
                imageName: data[idQr].imageName,
                title: data[idQr].title,
              }
            });
            
          } else {
            console.log("No matching data for ID:", idQr);
          }
        } catch (error) {
          console.error("Error processing QR data:", error);
        } finally {
          qrLock.current = false; // Знімаємо блокування
        }
      });
    }
  };
  
  

  // Відновлюємо роботу сканера при поверненні на цю сторінку
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsScannerActive(true); // Активуємо сканер знову
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        {/* Тут можна додати ваш Header компонент */}
      </View>

      {/* Сканер включається, тільки якщо isScannerActive === true */}
      {isScannerActive && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => handleBarcodeScanned(data)}
        />
      )}

      {/* Накладка поверх камери */}
      <Canvas
        style={StyleSheet.absoluteFillObject}
      >
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>

      {/* Кнопка Виходу */}
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('ScannerScreen')}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  exitButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#E6C081',
    padding: 10,
    borderRadius: 10,
  },
  exitButtonText: {
    color: '#3A3935',
    fontFamily: "DINCondensed",
    fontSize: 18,
  },
  
});
