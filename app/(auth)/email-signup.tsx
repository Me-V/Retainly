import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { firebaseConfig } from "@/services/config";
import { signupWithEmailPassword } from "@/services/api.auth";
import { LinearGradient } from "expo-linear-gradient";
import { MailOpenSVG, MyLogo } from "@/assets/logo";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function EmailSignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Signup + send verification
  const handleSignup = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      setEmailSent(true);
      // router.push("/(auth)/email-verification");
    } catch (err: any) {
      console.log(err);
      Alert.alert("Signup Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Verify + save token
  const handleCheckVerification = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No logged in user");

      const idToken = await user.getIdToken(true);
      const res = await signupWithEmailPassword(email, password, idToken);

      dispatch(setUser({ token: res?.token, userInfo: { email } }));

      Alert.alert("Success", "Email verified! You are now logged in.");
      console.log("~Vasu Sharma :- backend Email Sign Up token", res?.token);

      // TODO: Navigate to dashboard/home
    } catch (err: any) {
      console.log(err);
      const backendMsg =
        err.response?.data?.detail ||
        "Please check your email for verification.";
      Alert.alert("Email not verified", backendMsg);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <>
        <LinearGradient
          colors={["#FFFFFF", "#E4C7A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1 px-6"
        >
          {/* Back Button */}
          <TouchableOpacity className="mt-12" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Email Icon */}
          <View className="items-center mt-16">
            <MailOpenSVG />
          </View>

          {/* Message Box */}
          <View className="bg-[#FEFCF3] rounded-3xl px-6 py-8 mt-10 shadow-md">
            <Text className="text-center text-black font-medium leading-6 text-[20px]">
              we have sent you a verification link on{" "}
              <Text className="text-orange-500 font-semibold">
                xzy@email.com
              </Text>{" "}
              please verify to continue
            </Text>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={() => handleCheckVerification()}
              className="bg-orange-500 rounded-full py-4 mt-8 shadow-md"
            >
              <Text className="text-white text-center font-semibold text-base">
                Verify
              </Text>
            </TouchableOpacity>

            {/* Resend Code */}
            <TouchableOpacity
              onPress={() => console.log("Resend Code Pressed")}
            >
              <Text className="text-orange-500 text-center font-medium text-[16px] mt-4">
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text className="text-black font-medium text-xs text-center mt-20">
            Terms & Conditions
          </Text>
        </LinearGradient>
      </>
    );
  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E4C7A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="items-center mt-16 mb-12">
          <MyLogo />
        </View>

        {/* Form */}
        <View className="px-8">
          <Text className="text-center text-black text-xl mb-8">
            Sign Up with Email
          </Text>

          <Text className="text-center text-black text-xl mb-4">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="border border-gray-300 rounded-3xl px-4 py-3 mb-4 bg-white text-gray-700"
          />

          <Text className="text-center text-black text-xl mb-4">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-3xl px-4 py-3 mb-6 bg-white text-gray-700"
          />
          <Text className="text-center text-black text-xl mb-4">
            Confirm Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-3xl px-4 py-3 mb-6 bg-white text-gray-700"
          />

          {loading && (
            <ActivityIndicator size="large" color="#000" className="mb-4" />
          )}

          {!emailSent ? (
            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              className="bg-[#F98455] border border-gray-300 rounded-3xl py-4 mb-4"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              <Text className="font-medium text-white text-base text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleCheckVerification}
              disabled={loading}
              className="bg-[#FFF3C4] border border-gray-300 rounded-3xl py-4 mb-4"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              <Text className="text-gray-700 font-medium text-base text-center">
                Check Email Verification
              </Text>
            </TouchableOpacity>
          )}

          {/* Footer */}
          <Text className="text-black font-medium text-base text-center">
            Terms & Conditions
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
