import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Curriculum } from "@/types";
import curriculumData from "@/assets/curriculum.json";
import { useAuth } from "@/context/AuthContext";

const SubjectSelectionScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const curriculum = curriculumData as unknown as Curriculum;

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);

  const classData = user?.class
    ? curriculum.classes[user.class.toString()]
    : {};
  const subjects = Object.keys(classData);
  const topics = selectedSubject
    ? Object.keys(classData[selectedSubject] || {})
    : [];

  const handleContinue = () => {
    if (selectedTopic) {
      router.push({
        pathname: "/questions",
        params: {
          topic: selectedTopic,
          subject: selectedSubject,
          class: user?.class?.toString() || "",
        },
      });
    }
  };

  const renderSubjectItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => {
        setSelectedSubject(item);
        setSelectedTopic(undefined);
        setShowSubjectModal(false);
      }}
    >
      <Text className="text-textDark">{item}</Text>
    </TouchableOpacity>
  );

  const renderTopicItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => {
        setSelectedTopic(item);
        setShowTopicModal(false);
      }}
    >
      <Text className="text-textDark">{item}</Text>
      <Text className="text-gray-600 text-sm">
        {classData[selectedSubject || ""][item]?.chapters} chapters
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        padding: isTablet ? 0 : 16,
        flexGrow: 1,
        alignItems: isTablet ? "center" : "stretch",
      }}
    >
      {/* Logo */}
      <View className={`items-center mt-5 mb-4 ${isTablet ? "w-2/3" : "w-full"}`}>
        <Image
          source={require("../assets/companyLogo.png")}
          style={{
            width: isTablet ? 250 : 180,
            height: isTablet ? 250 : 180,
            marginBottom: 20,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Title */}
      <Text
        className="font-bold text-textDark mb-6 text-center"
        style={{ fontSize: isTablet ? 28 : 20 }}
      >
        Select Subject and Topic
      </Text>

      {/* Class Info */}
      {user?.class && user?.board && (
        <View
          className="bg-[#F8F8F8] p-4 rounded-xl mb-6"
          style={{ width: isTablet ? "70%" : "100%" }}
        >
          <Text className="text-lg font-semibold text-textDark text-center">
            Class {user.class} - {user.board}
            {user.stream && ` - ${user.stream}`}
          </Text>
        </View>
      )}

      {/* Dropdowns side-by-side on tablet */}
      <View
        className="mb-6 flex-row gap-4"
        style={{
          flexDirection: isTablet ? "row" : "column",
          width: isTablet ? "70%" : "100%",
        }}
      >
        {/* Subject */}
        <View style={{ flex: 1 }}>
          <Text className="text-lg text-textDark mb-2">Subject</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-xl p-4 bg-white"
            onPress={() => setShowSubjectModal(true)}
          >
            <Text className="text-textDark">
              {selectedSubject || "Select a subject"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Topic */}
        <View style={{ flex: 1 }}>
          <Text className="text-lg text-textDark mb-2">Topic</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-xl p-4 bg-white"
            onPress={() => selectedSubject && setShowTopicModal(true)}
            disabled={!selectedSubject}
          >
            <Text
              className={!selectedSubject ? "text-gray-400" : "text-textDark"}
            >
              {selectedTopic || "Select a topic"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedTopic}
        className={`rounded-xl py-4 px-6 items-center mt-3 ${
          selectedTopic ? "bg-[#FE904B]" : "bg-[#FEBE9A]"
        }`}
        style={{ width: isTablet ? "50%" : "100%", marginBottom: isTablet ? 26 : 10 }}
      >
        <Text className="text-white font-semibold text-lg">Continue</Text>
      </TouchableOpacity>

      {/* Subject Modal */}
      <Modal visible={showSubjectModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="bg-white rounded-xl max-h-[70%]"
            style={{ width: isTablet ? "60%" : "80%" }}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-textDark">
                Select Subject
              </Text>
            </View>
            <FlatList
              data={subjects}
              keyExtractor={(item) => item}
              renderItem={renderSubjectItem}
            />
            <TouchableOpacity
              className="p-4 border-t border-gray-200 items-center"
              onPress={() => setShowSubjectModal(false)}
            >
              <Text className="text-primary font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Topic Modal */}
      <Modal visible={showTopicModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="bg-white rounded-xl max-h-[70%]"
            style={{ width: isTablet ? "60%" : "80%" }}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-textDark">
                Select Topic
              </Text>
            </View>
            <FlatList
              data={topics}
              keyExtractor={(item) => item}
              renderItem={renderTopicItem}
            />
            <TouchableOpacity
              className="p-4 border-t border-gray-200 items-center"
              onPress={() => setShowTopicModal(false)}
            >
              <Text className="text-primary font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SubjectSelectionScreen;
