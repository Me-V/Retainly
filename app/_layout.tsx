import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";

function AuthGuard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/"); // login
      } else if (user.isNewUser) {
        router.replace("/signup"); // profile setup
      } else {
        router.replace("/subject-selection"); // normal app flow
      }
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FE904B" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="subject-selection" />
      <Stack.Screen name="questions" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <AuthProvider>
        <AuthGuard />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
