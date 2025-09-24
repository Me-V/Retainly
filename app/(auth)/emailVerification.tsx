import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { MailOpenSVG } from "@/assets/logo";
import { LinearGradient } from "expo-linear-gradient";

const VerifyEmailScreen = () => {
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(30);

  // Add countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    console.log("Verification Code:", code);
    // Handle verification logic here
  };

  const handleResendCode = () => {
    setCountdown(30);
    // Handle resend logic here
  };

  // Define styles object since StyleSheet is not imported
  const styles = {
    container: {},
    pinCodeContainer: {},
    pinCodeText: {},
    focusStick: {},
    activePinCodeContainer: {},
    placeholderText: {},
    filledPinCodeContainer: {},
    disabledPinCodeContainer: {},
  };

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
          <View className="items-center justify-center pt-36 pb-3">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
              <MailOpenSVG />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Email Verification
            </Text>
            <Text className="text-lg text-gray-600 text-center px-8 mt-5">
              Verfication Code
            </Text>
          </View>

          {/* Verification Code Section */}
          <View className="px-8">
            {/* OTP Input */}
            <View className="items-center mb-8">
              <TextInput
                className="w-full shadow-lg shadow-black bg-white border border-gray-300 rounded-lg pl-4 py-4 text-gray-900"
                placeholderTextColor="#9CA3AF"
                value={code}
                onChangeText={setCode}
              />
            </View>

            <TouchableOpacity
              className="bg-[#F98455] py-4 rounded-lg mb-2"
              onPress={() => {}}
            >
              <Text className="text-white text-center text-base font-medium">
                Verify
              </Text>
            </TouchableOpacity>

            {/* Resend Code */}
            <View className="items-end mb-8">
              <TouchableOpacity
                onPress={handleResendCode}
                disabled={countdown > 0}
              >
                <Text
                  className={`font-medium ${
                    countdown > 0 ? "text-gray-400" : "text-[#E03636]"
                  }`}
                >
                  Resend Code {countdown > 0 && `(${countdown}s)`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms & Conditions */}
            <View className="items-center">
              <Text className="text-black mt-28">Terms & Conditions</Text>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default VerifyEmailScreen;