import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

const audioFiles = {
  'audio3': require('../assets/audio/church.aiff'),
  'audio1': require('../assets/audio/saltmakingRoom№2.aiff'),
  'audio4': require('../assets/audio/saltmakingRoom.aiff'),
  'audio5': require('../assets/audio/brineSedimentationTanks.aiff'),
  'audio8': require('../assets/audio/royalRig№1.aiff'),
};

const AudioPlayer = forwardRef(({ style, audioFileName }, ref) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  const numberOfWaves = 40;

  const waveHeights = useMemo(() => {
    return Array.from({ length: numberOfWaves }, () => Math.random() * 40 + 10);
  }, [numberOfWaves]);

  const playPauseHandler = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (progress === 1) {
        await sound.setPositionAsync(0); // Почати з початку, якщо закінчено
      }
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      const audioSource = audioFiles[audioFileName] || audioFiles['default.mp3'];
      const { sound } = await Audio.Sound.createAsync(audioSource);
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 1);
          setProgress((status.positionMillis || 0) / (status.durationMillis || 1));
          if (status.didJustFinish) {
            setIsPlaying(false);
            setProgress(1);
          }
        }
      });
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioFileName]);

  // Реалізуємо метод для зупинки аудіо через ref
  useImperativeHandle(ref, () => ({
    stopAudio: async () => {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
        setProgress(0);
      }
    },
  }));

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.playButton} onPress={playPauseHandler}>
        <Text style={styles.playTriangle}>{isPlaying ? '❚❚' : '▶'}</Text>
      </TouchableOpacity>

      <View style={styles.wavesContainer}>
        {waveHeights.map((height, index) => {
          const waveProgress = (index + 1) / numberOfWaves;
          const waveColor = progress >= waveProgress ? '#E6C081' : '#D9D9D9';

          return (
            <View
              key={index.toString()}
              style={[
                styles.wave,
                {
                  backgroundColor: waveColor,
                  height: height,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
});

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  playTriangle: {
    color: '#E6C081',
    fontSize: 36,
  },
  wavesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    overflow: 'hidden',
  },
  wave: {
    width: 3,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});
