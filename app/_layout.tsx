// app/layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Не вказуємо component у Stack.Screen */}
      <Stack.Screen name="StartScreen" />
      <Stack.Screen name="ObjectScreen" />
      <Stack.Screen name="ScannerScreen" />
      

    </Stack>
  );
}
