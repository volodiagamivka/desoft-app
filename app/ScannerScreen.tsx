import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Header from '@/components/Header';
import CustomButton from '@/components/Button';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ScannerScreen() {
  const router = useRouter();
  const topPadding = height < 600 ? 10 : 20;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <Header />
      <View style={styles.text}>
        <Text style={styles.title}>
          Щоб розпочати екскурсію, будь ласка, проскануйте QR-код, розміщений поруч
        </Text>
        <Text style={styles.description}>
          Це надасть вам доступ до всіх матеріалів екскурсії
        </Text>
      </View>
      <View style={styles.qrContainer}>
        <Image source={require('../assets/images/qr-rams.png')} style={styles.qr} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Сканувати"
          onPress={() => router.push('/QRScreen')}
          width={320}
          height={50}
          fontSize={20}
          center={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    paddingBottom: 35,
  },
  text: {
    marginTop: 70,
    flex: 0,
  },
  title: {
    fontFamily: 'DINCondensed',
    fontSize: width < 375 ? 20 : 24,
    fontWeight: 700,
    lineHeight: 28,
    color: '#3A3935',
    width: '50%',
  },
  description: {
    fontFamily: 'DINCondensed-Light',
    color: '#3A3935',
    opacity: 0.7,
    fontSize: width < 375 ? 16 : 18,
    lineHeight: 24,
    width: '60%',
    marginTop: 10,
  },
  qrContainer: {
    flex: 1, // Це розтягує QR-код у доступному просторі
    justifyContent: 'center', // Центрує QR-код вертикально
    alignItems: 'center', // Центрує QR-код горизонтально
  },
  qr: {
    width: width * 0.45,
    height: width * 0.45,
  },
  buttonContainer: {
    alignItems: 'center', // Центрує кнопку по горизонталі
    marginBottom: 20, // Відступ від нижнього краю
  },
  button: {
    // Стилі кнопки залишаються незмінними, оскільки їх передаєте через `CustomButton`
  },
});
