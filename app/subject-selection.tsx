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
import { Curriculum, Subject, Topic } from "@/types";
import curriculumData from "@/assets/curriculum.json";

const SubjectSelectionScreen = () => {
  const router = useRouter();
  const curriculum = curriculumData as Curriculum;

  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [selectedTopic, setSelectedTopic] = useState<string>();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);

  const filteredTopics = selectedSubject
    ? curriculum.topics.filter((topic) => topic.subjectId === selectedSubject)
    : [];

  const handleContinue = () => {
    if (selectedTopic) {
      router.push({
        pathname: "/questions",
        params: { topic: selectedTopic },
      });
    }
  };

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => {
        setSelectedSubject(item.id);
        setSelectedTopic(undefined);
        setShowSubjectModal(false);
      }}
    >
      <Text className="text-textDark">{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTopicItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => {
        setSelectedTopic(item.title);
        setShowTopicModal(false);
      }}
    >
      <Text className="text-textDark">{item.title}</Text>
      <Text className="text-gray-600 text-sm">{item.description}</Text>
    </TouchableOpacity>
  );

  const getSelectedSubjectName = () => {
    return (
      curriculum.subjects.find((s) => s.id === selectedSubject)?.name ||
      "Select a subject"
    );
  };

  const getSelectedTopicName = () => {
    return selectedTopic || "Select a topic";
  };

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

      {/* Subject Selection */}
      <View className="mb-6 mx-2">
        <Text className="text-lg text-textDark mb-2">Subject</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-xl p-4"
          onPress={() => setShowSubjectModal(true)}
        >
          <Text className="text-textDark">{getSelectedSubjectName()}</Text>
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
              <FlatList
                data={curriculum.subjects}
                keyExtractor={(item) => item.id}
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
      </View>

      {/* Topic Selection */}
      <View className="mb-6 mx-2">
        <Text className="text-lg text-textDark mb-2">Topic</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-xl p-4"
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
            {getSelectedTopicName()}
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
              {filteredTopics.length > 0 ? (
                <FlatList
                  data={filteredTopics}
                  keyExtractor={(item) => item.title}
                  renderItem={renderTopicItem}
                />
              ) : (
                <View className="p-4 items-center">
                  <Text className="text-gray-500">No topics available</Text>
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
