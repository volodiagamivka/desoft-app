import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function PaymentScreen() {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null); // Типізація
  const [loading, setLoading] = useState(true);  // Додано індикатор завантаження

  const initiatePayment = async () => {
    try {
      const response = await fetch('https://salt-app-backend.onrender.com/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: '1', // Сума платежу
          currency: 'UAH',
          description: 'Оплата за екскурсію',
        }),
      });

      const { data, signature } = await response.json();

      if (data && signature) {
        setPaymentUrl(`https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`);
      } else {
        Alert.alert('Помилка', 'Не вдалося ініціювати платіж');
      }
    } catch (error) {
      console.warn('Помилка ініціалізації платежу', error);
      Alert.alert('Помилка', 'Щось пішло не так. Перевірте підключення до сервера.');
    } finally {
      setLoading(false); // Після ініціалізації завантаження вимикається
    }
  };

  useEffect(() => {
    initiatePayment();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <WebView 
        source={{ uri: paymentUrl || '' }}  
        onNavigationStateChange={(event) => {
          if (event.url.includes('success')) {
           
            router.push('/HomeScreen')
          }
        }}
        style={styles.webView} 
      />
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  }
};
