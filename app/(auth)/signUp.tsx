import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E4C7A6"]}
      start={{ x: 0, y: 0 }} // top
      end={{ x: 0, y: 1 }} // bottom
      className="flex-1"
    >
      {/* Header */}

      {/* Main Content */}

      <View className="px-6 pt-6 pb-3">
        {/* App Logo */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center">
            <Text className="text-white text-sm font-medium">App Logo</Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-7">
          Create Your Account
        </Text>

        {/* Full Name Section */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-1">
            Enter Your Full Name
          </Text>
          <View className="flex-row space-x-3 gap-10">
            <TextInput
              className="flex-1 shadow-lg shadow-black bg-white px-4 py-4 rounded-lg text-gray-900"
              placeholder=""
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              className="flex-1 shadow-lg shadow-black bg-white px-4 py-4 rounded-lg text-gray-900"
              placeholder=""
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Email Address */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-1">
            Email Address
          </Text>
          <TextInput
            className="shadow-lg shadow-black bg-white px-4 py-4 rounded-lg text-gray-900"
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Create Password */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-1">
            Create Password
          </Text>
          <TextInput
            className="shadow-lg shadow-black bg-white px-4 py-4 rounded-lg text-gray-900"
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-medium mb-1">
            Confirm Password
          </Text>
          <TextInput
            className="shadow-lg shadow-black bg-white px-4 py-4 rounded-lg text-gray-900"
            placeholder=""
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-[#F98455] py-4 rounded-lg mb-6"
          onPress={() => console.log("Sign up pressed")}
        >
          <Text className="text-white text-center text-base font-medium">
            Sign up
          </Text>
        </TouchableOpacity>

        {/* Terms & Conditions */}
        <View className="items-center">
          <TouchableOpacity onPress={() => console.log("Terms pressed")}>
            <Text className="text-black text-sm underline">
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;
