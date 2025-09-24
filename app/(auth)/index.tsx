import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MyLogo } from "@/assets/logo";
// import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { LinearGradient } from "expo-linear-gradient";
import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

GoogleSignin.configure({
  webClientId:
    "90805553457-nleg0gn2d3tsqd3nhr73col8oehaa5rl.apps.googleusercontent.com",
});

export default function SignInScreen() {
  // const { promptAsync } = useGoogleAuth();

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        if (response.data.idToken) {
          dispatch(
            setUser({ token: response.data.idToken, userInfo: response.data })
          );
        }

        console.log(response.data);
      } else {
        // sign in was cancelled by user
        console.log("sign in was cancelled by user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert("In Progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            Alert.alert("Play Services Not Available");
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        Alert.alert("Something went wrong");
      }
    }
  };
  return (
    <LinearGradient
      colors={["#FFFFFF", "#E4C7A6"]}
      start={{ x: 0, y: 0 }} // top
      end={{ x: 0, y: 1 }} // bottom
      className="flex-1"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="items-center mt-16 mb-12">
          <MyLogo />
          <Text className="text-gray-600 text-sm font-medium mt-9">
            tagline
          </Text>
        </View>

        {/* Options */}
        <View className="px-8">
          <Text className="text-center text-black text-xl mb-8">
            Sign In with
          </Text>

          {token ? (
            <Text className="text-center text-black text-xl mb-8">
              Already Signed In
            </Text>
          ) : (
            <TouchableOpacity
              className="bg-[#FFF3C4] flex-row items-center justify-center border border-gray-300 rounded-3xl py-4 mb-4"
              onPress={() => signIn()}
            >
              <Text className="text-gray-700 font-medium text-base">
                Google
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push("/(auth)/emailLogin")}
            className="bg-[#FFF3C4] flex-row items-center justify-center border border-gray-300 rounded-3xl py-4 mb-4"
          >
            <Text className="text-gray-700 font-medium text-base">Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/mobileLogin")}
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

          <Text className="text-sm text-center text-black mt-14">
            Terms & Conditions
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
