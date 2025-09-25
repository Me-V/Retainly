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
import { MailSVG } from "@/assets/logo";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          <View className="flex flex-row items-center justify-center pt-32 pb-10 gap-10">
            <View className="flex flex-col items-start gap-2">
              <Text className="text-3xl text-black font-semibold">
                Login with
              </Text>
              <Text className="text-3xl text-black font-semibold">Email</Text>
            </View>
            <MailSVG />
          </View>

          {/* Form Section */}
          <View className="px-8 pt-8">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-700 mb-2">
                Email Address
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full shadow-lg shadow-black bg-gray-50 border border-gray-300 rounded-lg pl-4 py-4 text-gray-900"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-700 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full shadow-lg shadow-black bg-gray-50 border border-gray-300 rounded-lg pl-4 py-4 text-gray-900"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3 z-10"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {/* {showPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )} */}
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            {/* <View className="flex-row justify-between items-center mb-8">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  className={`w-5 h-5 border-2 rounded-md mr-2 ${
                    rememberMe
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {rememberMe && (
                    <View className="w-full h-full items-center justify-center">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-600">Remember me</Text>
              </TouchableOpacity>

              
            </View> */}

            {/* Sign In Button */}
            <TouchableOpacity
              className="bg-[#F98455] py-4 rounded-lg mb-6"
              onPress={() => router.push("/emailVerification")}
            >
              <Text className="text-white text-center text-base font-medium">
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-end">
              <Text className="text-[#F98455] font-medium">
                Forget Password?
              </Text>
            </TouchableOpacity>

            <View className="items-center">
              <Text className="text-black mt-14">Terms & Conditions</Text>
            </View>
          </View>

          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
