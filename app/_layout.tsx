// app/_layout.tsx
import { SplashScreen, Stack, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "./globals.css";
import SafeScreen from "@/components/safeScreen";
import { persistor, store } from "@/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootState } from "@/store";
import { LogBox, ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

// ✅ Inner component to handle redirect logic
function AuthRedirectWrapper({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    // Wait for redux-persist to finish
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setRehydrated(true);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (rehydrated) {
      // If token exists → redirect to home
      if (token) {
        router.replace("/(main)/animationsScreen");
      } else {
        // If no token → show auth screens
        router.replace("/(auth)/email-signup");
      }
    }
  }, [rehydrated, token]);

  // Show splash/loading while checking
  // if (!rehydrated) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return <>{children}</>;
}

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
            <AuthRedirectWrapper>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)/index" />
              </Stack>
            </AuthRedirectWrapper>
          </SafeScreen>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
