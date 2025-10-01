import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BackIcon, MobileLogo2, MyLogo } from "@/assets/logo";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "@/services/config";
import { router } from "expo-router";

// ✅ Import modular Firebase
import { getAuth, PhoneAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const MobileLoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef<any>(null);

  const sendVerificationCode = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );

      Alert.alert("OTP Sent", "Please check your phone");

      // 👉 Navigate to VerifyScreen with verificationId + phoneNumber
      router.replace({
        pathname: "/(auth)/mobileVerification",
        params: { verificationId, phoneNumber },
      });
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E4C7A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
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
          <View className="ml-4">
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcon />
            </TouchableOpacity>
          </View>
          {/* Header Section */}
          <View className="items-center mt-16 mb-12">
            <MyLogo />
            <Text className="text-[24px] text-black font-bold mt-6">
              Create Your Account
            </Text>
          </View>

          {/* Recaptcha */}
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <View className="items-center">
            <MobileLogo2 />
          </View>
          {/* Phone Number Input */}
          <View className="px-8 pt-8">
            <View className="mb-6">
              <Text className="text-lg text-center font-semibold text-gray-700 mb-2">
                Enter Mobile Number
              </Text>
              <TextInput
                className="w-full shadow-lg shadow-black bg-gray-50 border border-gray-300 pl-4 py-4 text-gray-900 rounded-3xl"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoComplete="tel"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              className="bg-[#F98455] py-4 rounded-3xl mb-6"
              onPress={sendVerificationCode}
            >
              <Text className="text-white text-center text-base font-medium">
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <Text className="text-black mt-20">Terms & Conditions</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MobileLoginScreen;
