import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Curriculum, ClassStructure } from "@/types";
import curriculumData from "@/assets/curriculum.json";
import { useAuth } from "@/context/AuthContext";

const SubjectSelectionScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const curriculum = curriculumData as unknown as Curriculum;

  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);

  // Get the class data based on user's selected class
  const classData = user?.class
    ? curriculum.classes[user.class.toString()]
    : {};

  // Get subjects for the selected class
  const subjects = Object.keys(classData);

  // Get topics for the selected subject
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
    <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center mt-5 mb-2">
        <Image
          source={require("../assets/companyLogo.png")}
          className="w-48 h-48 mb-4"
        />
      </View>

      <Text className="text-xl font-bold text-textDark mb-6 text-center">
        Select Subject and Topic
      </Text>

      {/* Display user's class and board information */}
      {user?.class && user?.board && (
        <View className="bg-[#F8F8F8] p-4 rounded-xl mb-6 mx-2">
          <Text className="text-lg font-semibold text-textDark text-center">
            Class {user.class} - {user.board}
            {user.stream && ` - ${user.stream}`}
          </Text>
        </View>
      )}

      <View className="mb-6 mx-2">
        <Text className="text-lg text-textDark mb-2">Subject</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-xl p-4 bg-white"
          onPress={() => setShowSubjectModal(true)}
        >
          <Text className="text-textDark">
            {selectedSubject || "Select a subject"}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showSubjectModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowSubjectModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl w-80 max-h-80">
              <View className="p-4 border-b border-gray-200">
                <Text className="text-lg font-semibold text-textDark">
                  Select Subject
                </Text>
              </View>
              {subjects.length > 0 ? (
                <FlatList
                  data={subjects}
                  keyExtractor={(item) => item}
                  renderItem={renderSubjectItem}
                />
              ) : (
                <View className="p-4 items-center">
                  <Text className="text-gray-500">
                    No subjects available for this class
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className="p-4 border-t border-gray-200 items-center"
                onPress={() => setShowSubjectModal(false)}
              >
                <Text className="text-primary font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View className="mb-6 mx-2">
        <Text className="text-lg text-textDark mb-2">Topic</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-xl p-4 bg-white"
          onPress={() => {
            if (selectedSubject) {
              setShowTopicModal(true);
            }
          }}
          disabled={!selectedSubject}
        >
          <Text
            className={`${
              !selectedSubject ? "text-gray-400" : "text-textDark"
            }`}
          >
            {selectedTopic || "Select a topic"}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showTopicModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowTopicModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl w-80 max-h-80">
              <View className="p-4 border-b border-gray-200">
                <Text className="text-lg font-semibold text-textDark">
                  Select Topic
                </Text>
              </View>
              {topics.length > 0 ? (
                <FlatList
                  data={topics}
                  keyExtractor={(item) => item}
                  renderItem={renderTopicItem}
                />
              ) : (
                <View className="p-4 items-center">
                  <Text className="text-gray-500">
                    {selectedSubject
                      ? "No topics available for this subject"
                      : "Please select a subject first"}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className="p-4 border-t border-gray-200 items-center"
                onPress={() => setShowTopicModal(false)}
              >
                <Text className="text-primary font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedTopic}
        className={`rounded-xl py-4 px-6 items-center mt-3 mx-2 ${
          selectedTopic ? "bg-[#FE904B]" : "bg-[#FEBE9A]"
        }`}
      >
        <Text className="text-white font-semibold">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubjectSelectionScreen;
