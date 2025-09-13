import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const QuestionsScreen = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const { topic } = useLocalSearchParams();

  const questions = [
    "What is the derivative of x²?",
    "Solve for x: 2x + 5 = 15",
    "What is the integral of 2x?",
    "Explain the chain rule with an example",
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#F8F8F8] p-6">
      <View className="items-center mb-2 mt-10">
        <Image
          source={require("../assets/companyLogo.png")}
          className="w-48 h-48 mb-4"
        />
      </View>
      <Text className="text-2xl font-bold text-textDark mb-6 text-center">
        {topic}
      </Text>

      <ScrollView className="flex-1">
        {questions.map((question, index) => (
          <Text
            key={index}
            className="border border-black px-4 py-3 mb-5 rounded-xl text-xl font-semibold"
          >
            {question}
          </Text>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="border border-[#FE904B] rounded-xl py-4 px-6 items-center mt-6"
        onPress={handleLogout}
      >
        <Text className="text-[#FE904B] font-bold text-xl">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionsScreen;
