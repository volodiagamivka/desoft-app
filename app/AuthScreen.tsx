import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image, Keyboard, Alert ,Dimensions} from 'react-native';
import { useRouter } from 'expo-router'; 

const { width, height } = Dimensions.get('window');
export default function AuthScreen() {
    const fontSize = width < 375 ? 20 : 30;
    const router = useRouter();
    const [activationCode, setActivationCode] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateCode = (code: string) => {
        const validCode = '111 111 111 111'; // Приклад правильного коду

        if (code !== validCode) {
            setError(true); // Неправильний код
            setSuccess(false);
            setActivationCode(''); // Очищаємо поле
            Keyboard.dismiss(); 
        } else {
            setError(false); // Правильний код
            setSuccess(true); // Активація успішна
            setActivationCode(''); // Очищаємо поле вводу
            Keyboard.dismiss();  // Сховуємо клавіатуру
        }
    };

    const formatCode = (text: string) => {
        let formattedText = text.replace(/\D/g, ''); // Видаляємо всі нечислові символи
        formattedText = formattedText.replace(/(\d{3})(?=\d)/g, '$1 '); // Форматуємо на групи по 3 цифри
        setActivationCode(formattedText);

        if (formattedText.length === 15) {
            validateCode(formattedText);
        }
    };

    const handleNoCode = () => {
        Alert.alert(
            'Зверніться до адміністрації', 
            'Будь ласка, зверніться до адміністрації для отримання коду активації.',
            [{ text: 'OK' }]
        );
        setActivationCode(''); // Очищаємо поле вводу
        setError(false);  // Вимикаємо помилку
    };

    if (success) {
        // Якщо активація успішна, після 2 секунд переходити на HomeScreen
        setTimeout(() => {
            router.push('/HomeScreen'); // Перехід на HomeScreen
        }, 2000);
    }

    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {!success && ( // Якщо активація не успішна, показуємо лого, поле вводу і текст
                    <>
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/images/logo_white.png')} style={styles.logo} />
                        </View>

                        <View style={styles.content}>
                            <Text style={[styles.title,{ fontSize }, error && styles.errorTitle]}>
                                {error ? 'НЕВІРНИЙ КОД' : 'ВВЕДІТЬ КОД АКТИВАЦІЇ'}
                            </Text>

                            <TextInput
                                style={[styles.input, error && styles.errorInput]}  
                                placeholder="___ ___ ___ ___"
                                value={activationCode}
                                onChangeText={formatCode}
                                maxLength={15} // Максимальна довжина введеного коду
                                keyboardType="numeric"
                                placeholderTextColor="#F5F5F5" 
                                textAlign='center'
                            />
                          
                            <TouchableOpacity onPress={handleNoCode}>
                                <Text style={styles.subtitle}>Я не маю кода активації</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {success && ( // Якщо активація успішна, показуємо повідомлення
                    <View style={styles.successContainer}>
                        <Image source={require('../assets/images/succesfull.png')} style={styles.successIcon} />
                        <Text style={[styles.successMessage,{fontSize}]}>АКТИВАЦІЯ УСПІШНА</Text>
                    </View>
                )}
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
      flex: 0, // Логотип не буде займати весь простір
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30, // Відстань між логотипом і наступними елементами
    },
    logo: {
      width: 50.5,
      height: 57,
    },
    content: {
      marginTop: 60, // Відстань між логотипом та іншими елементами
      alignItems: 'center',
      width: '80%',
    },
    title: {
      color: '#E7E4E2',
      fontSize: 40,
      letterSpacing: 0.8,
      textAlign: 'center',
      fontWeight: '400',
      lineHeight: 48,
      marginBottom: 50,
      fontFamily: 'DINCondensed-Light',
      paddingTop: 10,
    },
    errorTitle: {
      color: '#E65D6F',  // Червоний колір для заголовка "Невірний код"
    },
    input: {
      width: '100%',
      height: 50,
      opacity: 0.6,
      borderRadius: 10,
      marginBottom: 30,
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'DINCondensed',
      fontWeight: 700,
      letterSpacing: 6, 
      backgroundColor: '#3A3935',
      color: '#fff',
    },
    errorInput: {
      borderColor: '#E65D6F', 
      borderWidth: 2,
    },
    subtitle: {
      fontFamily: 'DINCondensed',
      fontSize: 20,
      color: '#F5F5F5',
    },
    successContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    successIcon: {
      width: 90,
      height: 110,
      marginBottom: 40,
    },
    successMessage: {
      color: '#E6C081',
      fontSize: 40,
      fontFamily: 'DINCondensed-Light',
      fontWeight: 400,
      letterSpacing: 0.8,
      textTransform: 'uppercase'
    },
  });