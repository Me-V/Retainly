import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MobileLogo } from "@/assets/logo";

const LoginScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E4C7A6"]}
      start={{ x: 0, y: 0 }} // top
      end={{ x: 0, y: 1 }} // bottom
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="flex flex-row items-center justify-center pt-[150px] pb-10 gap-10">
            <View className="flex flex-col items-start gap-2">
              <Text className="text-3xl text-black font-semibold">
                Sign up with
              </Text>
              <Text className="text-3xl text-black font-semibold">Mobile</Text>
            </View>
            <MobileLogo />
          </View>

          {/* Form Section */}
          <View className="px-8 pt-8">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-lg text-center font-semibold text-gray-700 mb-2">
                Enter Mobile Number
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full shadow-lg shadow-black bg-gray-50 border border-gray-300 rounded-lg pl-4 py-4 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              className="bg-[#F98455] py-4 rounded-lg mb-6"
              onPress={() => router.push("/mobileVerification")}
            >
              <Text className="text-white text-center text-base font-medium">
                Verify
              </Text>
            </TouchableOpacity>

            <View className="items-center">
              <Text className="text-black mt-[150px]">Terms & Conditions</Text>
            </View>
          </View>

          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;