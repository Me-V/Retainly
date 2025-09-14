import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const QuestionsScreen = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { topic } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const questions = [
    "What is the derivative of x²?",
    "Solve for x: 2x + 5 = 15",
    "What is the integral of 2x?",
    "Explain the chain rule with an example",
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#F8F8F8]" style={{ padding: isTablet ? 32 : 16 }}>
      {/* Logo */}
      <View className="items-center mb-4 mt-2">
        <Image
          source={require("../assets/companyLogo.png")}
          style={{
            width: isTablet ? 250 : 180,
            height: isTablet ? 250 : 180,
            marginBottom: isTablet ? 0 : 20,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Topic Title */}
      <Text
        className="font-bold text-textDark mb-6 text-center"
        style={{ fontSize: isTablet ? 28 : 22 }}
      >
        {topic}
      </Text>

      {/* Questions Grid (2 cols on tablets, 1 col on phones) */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: isTablet ? "row" : "column",
          flexWrap: isTablet ? "wrap" : "nowrap",
          justifyContent: "center",
          gap: isTablet ? 20 : 12,
        }}
      >
        {questions.map((question, index) => (
          <View
            key={index}
            style={{
              flexBasis: isTablet ? "41%" : "100%",
            }}
          >
            <Text
              className="border border-black px-4 py-3 rounded-xl font-semibold"
              style={{ fontSize: isTablet ? 20 : 16, marginBottom: isTablet ? 0 : 12 }}
            >
              {question}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="border border-[#FE904B] rounded-xl py-4 px-6 items-center mt-6"
        style={{ alignSelf: isTablet ? "center" : "stretch", width: isTablet ? "40%" : "100%" }}
      >
        <Text
          className="text-[#FE904B] font-bold"
          style={{ fontSize: isTablet ? 22 : 18 }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionsScreen;
