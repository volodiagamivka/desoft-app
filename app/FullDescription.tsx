import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/HeaderWhite';
import Arrow from '../assets/icons/arrow-black.svg';
import { CommonActions } from '@react-navigation/native';
import AudioPlayer from '../components/AudioPlayer'; // Імпорт компонента AudioPlayer

const { width } = Dimensions.get('window');

const images = {
  'church': require('../assets/images/church-head.png'),
  'default.jpg': require('../assets/images/default.jpg'),
  'administrativeBuilding': require('../assets/images/administrativeBuilding.jpg'),
  'brineSedimentationTank№1': require('../assets/images/brineSedimentationTank№1.jpg'),
  'brineSedimentationTanks': require('../assets/images/brineSedimentationTanks-head.png'),
  'electricalWorkshop': require('../assets/images/electricalWorkshop.jpg'),
  'royalRig№1': require('../assets/images/royalRig№1-head.png'),
  'saltmakingRoom': require('../assets/images/saltmakingRoom-head.png'),
  'saltmakingRoom№2': require('../assets/images/saltmakingRoom-head.png'),
  'warehouseBuildings': require('../assets/images/warehouseBuildings.jpg'),
};

export default function FullDescriptionScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageName, setImageName] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const audioPlayerRef = useRef(null); // Додаємо реф для плеєра

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.title || '');
      setDescription(route.params.description || '');
      setImageName(route.params.imageName || 'default.jpg');
      setAudioFileName(route.params.audioFileName || null);
    }
  }, [route.params]);

  const imageSource = images[imageName] || images['default.jpg'];

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  const handleNextLocation = async () => {
    if (audioPlayerRef.current) {
      await audioPlayerRef.current.stopAudio(); // Зупиняємо аудіо
    }
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Встановлює новий активний маршрут
        routes: [{ name: 'QRScreen' }], // Видаляє всі попередні маршрути
      })
    );
  };
  const handleGoBack = async () => {
    if (audioPlayerRef.current) {
      await audioPlayerRef.current.stopAudio(); // Зупиняємо аудіо
    }
    navigation.goBack(); // Повертаємося назад
  };

  const handleBackToList = async () => {
    if (audioPlayerRef.current) {
      await audioPlayerRef.current.stopAudio(); // Викликаємо метод для зупинки аудіо
    }
    navigation.navigate('ScannerScreen'); // Переходимо до списку
  };
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image source={imageSource} style={styles.backgroundImage} />
        <Header />

        <TouchableOpacity style={styles.returnButton} onPress={handleBackToList}>
          <Arrow width={35} height={20} fill="#3A3935" />
          <Text style={styles.returnText}>Повернутись до списку</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
          >
            <Text style={styles.fullDescription}>{description}</Text>
          </ScrollView>

          <View style={styles.scrollBarContainer}>
            <Animated.View
              style={[
                styles.scrollIndicator,
                {
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, 500 - 200],
                        outputRange: [0, 200 - 60],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.audioPlayerContainer}>
          <AudioPlayer ref={audioPlayerRef} audioFileName={audioFileName} />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextLocation}>
          <Text style={styles.buttonTextNext}>Наступна локація</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rectangle: {
    width: '100%',
    height: '86%',
    backgroundColor: '#faf8f8',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 0,
    zIndex: 1,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 140,
    marginLeft: 20,
  },
  returnText: {
    marginLeft: 8,
    fontFamily: 'DINCondensed-Light',
    fontSize: 18,
    color: '#3A3935',
    letterSpacing: 1,
    lineHeight: 24,
  },
  title: {
    fontFamily: 'DINCondensed',
    fontSize: 32,
    color: '#202020',
    fontWeight: 'bold',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    maxHeight: '50%',
  },
  fullDescription: {
    fontFamily: 'DINCondensed-Light',
    fontSize: 18,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'justify',
  },
  scrollBarContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 3,
    height: 200,
    backgroundColor: '#F1F1F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scrollIndicator: {
    width: '100%',
    height: 100,
    backgroundColor: '#E6C081',
    borderRadius: 2,
  },
  audioPlayerContainer: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    right: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#E6C081',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#E6C081',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'DINCondensed',
    fontSize: 20,
    lineHeight: 24,
    color: '#E6C081',
    textAlign: 'center',
  },
  buttonTextNext: {
    fontFamily: 'DINCondensed',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A3935',
  },
});
