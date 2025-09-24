// app/_layout.tsx
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "./globals.css";
import SafeScreen from "@/components/safeScreen";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // hide splash when ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)/index" />
            </Stack>
          </SafeScreen>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
