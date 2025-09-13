import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { user, login } = useAuth();

  const handleGoogleLogin = () => {
    login(false);
    router.push("/subject-selection");
  };

  const handlePhoneLogin = () => {
    login(true);
    router.push("/signup");
  };
  

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      {/* Logo and Tagline */}
      <View className="items-center mb-2">
        <Image
          source={require("../assets/companyLogo.png")}
          className="w-48 h-48 mb-4"
        />
      </View>

      {/* Login Buttons */}
      <View className="">
        <TouchableOpacity
          className="flex-row gap-4 bg-white border border-gray-300 rounded-xl py-4 px-6 mb-4 items-center"
          // onPress={handleGoogleLogin}
        >
          <AntDesign name="google" size={24} color="black" />
          <Text className="text-textDark font-semibold">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#FE904B] rounded-xl py-4 px-6 items-center"
          onPress={handlePhoneLogin}
        >
          <Text className="text-white font-semibold">Save And Continue</Text>
        </TouchableOpacity>
        <Text className="text-[#FE904B] font-semibold ml-4 mt-3">
          Class and board are required
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
