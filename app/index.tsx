import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;


  const handlePhoneLogin = () => {
    login(true); // true means the user is new ...
    router.push("/signup");
  };

  return (
    <View
      className="flex-1 justify-center items-center bg-white"
      style={{ padding: isTablet ? 32 : 16 }}
    >
      {/* Logo */}
      <View className="items-center mb-6">
        <Image
          source={require("../assets/companyLogo.png")}
          style={{
            width: isTablet ? 260 : 180,
            height: isTablet ? 260 : 180,
            marginBottom: 20,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Buttons */}
      <View style={{ width: isTablet ? "50%" : "100%" }}>
        <TouchableOpacity
          className="flex-row bg-white border border-gray-300 rounded-xl items-center justify-center"
          style={{
            paddingVertical: isTablet ? 18 : 14,
            paddingHorizontal: isTablet ? 28 : 20,
            marginBottom: isTablet ? 20 : 14,
          }}
        >
          <AntDesign name="google" size={isTablet ? 28 : 22} color="black" />
          <Text
            className="text-textDark font-semibold"
            style={{
              marginLeft: 12,
              fontSize: isTablet ? 20 : 16,
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#FE904B] rounded-xl items-center"
          onPress={handlePhoneLogin}
          style={{
            paddingVertical: isTablet ? 18 : 14,
            paddingHorizontal: isTablet ? 28 : 20,
          }}
        >
          <Text
            className="text-white font-semibold"
            style={{ fontSize: isTablet ? 20 : 16 }}
          >
            Save And Continue
          </Text>
        </TouchableOpacity>

        <Text
          className="text-[#FE904B] font-semibold mt-4 text-center"
          style={{ fontSize: isTablet ? 18 : 14 }}
        >
          Class and board are required
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
