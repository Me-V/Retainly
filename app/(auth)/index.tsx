import { router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import MyLogo from "@/utils/logo";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

export default function SignInScreen() {
  const { promptAsync } = useGoogleAuth();
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="items-center mt-16 mb-12">
        <MyLogo />
        <Text className="text-gray-600 text-sm font-medium mt-9">tagline</Text>
      </View>

      {/* Options */}
      <View className="px-8">
        <Text className="text-center text-black text-xl mb-8">
          Sign In with
        </Text>

        <TouchableOpacity
          className="bg-[#FFF3C4] flex-row items-center justify-center border border-gray-300 rounded-3xl py-4 mb-4"
          onPress={() => promptAsync()}
        >
          <Text className="text-gray-700 font-medium text-base">Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signUp")}
          className="bg-[#FFF3C4] flex-row items-center justify-center border border-gray-300 rounded-3xl py-4 mb-4"
        >
          <Text className="text-gray-700 font-medium text-base">Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signUp")}
          className="bg-[#FFF3C4] flex-row items-center justify-center border border-gray-300 rounded-3xl py-4 mb-8"
        >
          <Text className="text-gray-700 font-medium text-base">
            Mobile Number
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-xl pt-1 pb-3 mb-8"
          onPress={() => router.push("/(auth)/signUp")}
        >
          <Text className="text-[#E03636] font-medium text-base text-center">
            Sign Up (Email)
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 text-xs">
          <Text className="text-sm text-black">Terms & Conditions</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
