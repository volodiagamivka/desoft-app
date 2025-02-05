import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HeaderWhite from '../components/HeaderWhite';
import Arrow from '../assets/icons/arrow-return.svg';
import Union from '../assets/icons/Union.svg';

const images = {
  'church': require('../assets/images/church.jpg'),
  'administrativeBuilding': require('../assets/images/administrativeBuilding.jpg'),
  'brineSedimentationTank№1': require('../assets/images/brineSedimentationTank№1.jpg'),
  'brineSedimentationTanks': require('../assets/images/brineSedimentationTanks.png'),
  'electricalWorkshop': require('../assets/images/electricalWorkshop.jpg'),
  'royalRig№1': require('../assets/images/royalRig№1.jpg'),
  'saltmakingRoom': require('../assets/images/saltmakingRoom.png'),
  'saltmakingRoom№2': require('../assets/images/saltmakingRoom№2.png'),
  'warehouseBuildings': require('../assets/images/warehouseBuildings.jpg'),

};

// Функція для переносу із дефісами
const hyphenateText = (text, maxLength) => {
  return text
    .split(' ')
    .map((word) => {
      if (word.length > maxLength) {
        let parts = [];
        for (let i = 0; i < word.length; i += maxLength) {
          parts.push(word.slice(i, i + maxLength));
        }
        return parts.join('-\n');
      }
      return word;
    })
    .join(' '); 
};

export default function ObjectScreen() {
  const route = useRoute();
  const { title, description, imageName,audioFileName } = route.params;
  const navigation = useNavigation();

  const imageSource = images[imageName] || require('../assets/images/default.jpg');
  const hyphenatedTitle = hyphenateText(title, 14);

  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 0.5, // Зменшення прозорості
      duration: 100, // Швидкість анімації
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 1, // Повернення до повної прозорості
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const handlePress = () => {
    const oldImageName = imageName.replace(/(\.\w+)$/, '-head$1');
    navigation.navigate('FullDescription', {
      title,
      description,
      imageName: oldImageName,
      audioFileName
    });
    
  };
  
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderWhite />
      </View>

      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('ScannerScreen')}>
          <Arrow width={35} height={20} fill="#000" />
          <Text style={styles.returnText}>Повернутись до списку</Text>
        </TouchableOpacity>
        <View style={styles.titleCont}>
          <Text style={styles.title}>{hyphenatedTitle}</Text>
        </View>
       <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          style={styles.unionContainer}
        >
          <Animated.View style={[{ opacity: opacityAnim }]}>
            <Union width={100} height={64} />
          </Animated.View>
        </Pressable>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 154,
    marginLeft: 35,
    zIndex: 9,
  },
  returnText: {
    marginLeft: 8,
    fontFamily: "DINCondensed-Light",
    fontSize: 18,
    color: '#f9f8f8',
    letterSpacing: 1,
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: '82%',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex:1
  },
    titleCont: {
      position: 'absolute',
      top: 200,
      left: 35,
      right: 30,
      zIndex: 2,
    },
    title: {
      fontFamily: "DINCondensed-Light",
      fontSize: 86,
      flexWrap: 'wrap',
      maxWidth: '100%',
      color: '#FFF',
      textAlign: 'left',
    },
    unionContainer: {
      position: 'absolute',
      bottom: 70, // Відстань від нижнього краю картинки
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3, // Встановлюємо вищий рівень для Union
    },
    description: {
      paddingLeft: 34,
      paddingRight: 42,
      paddingBottom:24,
      fontFamily:"DINCondensed-Light",
      fontSize: 18,
      color: '#000',
      lineHeight: 24,
      letterSpacing:1,
      textAlign: 'left',
      flexWrap: 'wrap',
      width: '100%',
      marginTop: 20,
    },
  });
  