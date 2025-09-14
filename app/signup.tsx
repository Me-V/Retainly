import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Curriculum } from "@/types";
import curriculumData from "@/assets/curriculum.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";

const SignUpScreen = () => {
  const router = useRouter();
  const { saveUserProfile } = useAuth();

  // handle JSON import being possibly wrapped as { default: ... }
  const rawCurriculum: any = curriculumData;
  const curriculum: Curriculum =
    (rawCurriculum && rawCurriculum.default) || rawCurriculum;

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>();
  const [selectedStream, setSelectedStream] = useState<string | undefined>();
  const [showClassModal, setShowClassModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // derive arrays safely
  const classList = useMemo(() => {
    if (!curriculum?.classes) return [];
    return Object.keys(curriculum.classes)
      .map((k) => parseInt(k, 10))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  }, [curriculum]);

  const boardList = useMemo(() => curriculum?.boards ?? [], [curriculum]);
  const streamList = useMemo(() => curriculum?.streams ?? [], [curriculum]);

  // helpful logs for debugging in Expo console
  useEffect(() => {
    console.log("Curriculum object:", curriculum);
    console.log("classList:", classList);
    console.log("boardList:", boardList);
    console.log("streamList:", streamList);
  }, [curriculum, classList, boardList, streamList]);

  const handleSave = async () => {
    if (
      !selectedClass ||
      !selectedBoard ||
      (selectedClass > 10 && !selectedStream)
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setIsSaving(true);
    try {
      await saveUserProfile({
        class: selectedClass,
        board: selectedBoard,
        stream: selectedClass > 10 ? selectedStream : undefined,
      });
      router.push("/subject-selection");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile. Please try again.");
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const ListItem = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <TouchableOpacity className="p-4 border-b border-gray-200" onPress={onPress}>
      <Text className="text-textDark">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="flex-1 bg-[#F8F8F8] p-6"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ width: isTablet ? "70%" : "100%", maxWidth: 800 }}>
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mt-7 mb-4">
          <AntDesign name="arrowleft" size={24} color="#2A262B" />
          <Text className="text-textDark ml-2 font-bold">Choose Subject</Text>
        </TouchableOpacity>
        <View className="w-full h-[1px] bg-gray-300" />

        <Text className="text-2xl font-bold text-textDark my-6">Complete Your Profile</Text>

        {/* Class */}
        <View className="mb-6">
          <Text className="text-lg text-textDark mb-2">Class</Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-xl p-4 bg-white"
            onPress={() => setShowClassModal(true)}
          >
            <Text className="text-textDark">{selectedClass ? `Class ${selectedClass}` : "Select your class"}</Text>
          </TouchableOpacity>

          <Modal visible={showClassModal} transparent animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white rounded-xl w-80 max-h-80">
                <View className="p-4 border-b border-gray-200">
                  <Text className="text-lg font-semibold text-textDark">Select Class</Text>
                </View>

                <FlatList
                  data={classList}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <ListItem
                      label={`Class ${item}`}
                      onPress={() => {
                        setSelectedClass(item);
                        setShowClassModal(false);
                        // reset stream if class <= 10
                        if (item <= 10) setSelectedStream(undefined);
                      }}
                    />
                  )}
                  ListEmptyComponent={
                    <View className="p-4 items-center">
                      <Text className="text-gray-500">No classes found</Text>
                    </View>
                  }
                />

                <TouchableOpacity className="p-4 border-t border-gray-200 items-center" onPress={() => setShowClassModal(false)}>
                  <Text className="text-primary font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Board */}
        <View className="mb-6">
          <Text className="text-lg text-textDark mb-2">Board</Text>
          <TouchableOpacity className="border border-gray-300 rounded-xl p-4 bg-white" onPress={() => setShowBoardModal(true)}>
            <Text className="text-textDark">{selectedBoard || "Select your board"}</Text>
          </TouchableOpacity>

          <Modal visible={showBoardModal} transparent animationType="slide">
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white rounded-xl w-80 max-h-80">
                <View className="p-4 border-b border-gray-200">
                  <Text className="text-lg font-semibold text-textDark">Select Board</Text>
                </View>

                <FlatList
                  data={boardList}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <ListItem
                      label={item}
                      onPress={() => {
                        setSelectedBoard(item);
                        setShowBoardModal(false);
                      }}
                    />
                  )}
                  ListEmptyComponent={
                    <View className="p-4 items-center">
                      <Text className="text-gray-500">No boards found</Text>
                    </View>
                  }
                />

                <TouchableOpacity className="p-4 border-t border-gray-200 items-center" onPress={() => setShowBoardModal(false)}>
                  <Text className="text-primary font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Stream (only for class > 10) */}
        {selectedClass && selectedClass > 10 && (
          <View className="mb-6">
            <Text className="text-lg text-textDark mb-2">Stream</Text>
            <TouchableOpacity className="border border-gray-300 rounded-xl p-4 bg-white" onPress={() => setShowStreamModal(true)}>
              <Text className="text-textDark">{selectedStream || "Select stream (optional)"}</Text>
            </TouchableOpacity>

            <Modal visible={showStreamModal} transparent animationType="slide">
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white rounded-xl w-80 max-h-80">
                  <View className="p-4 border-b border-gray-200">
                    <Text className="text-lg font-semibold text-textDark">Select Stream</Text>
                  </View>

                  <FlatList
                    data={streamList}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <ListItem
                        label={item}
                        onPress={() => {
                          setSelectedStream(item);
                          setShowStreamModal(false);
                        }}
                      />
                    )}
                    ListEmptyComponent={
                      <View className="p-4 items-center">
                        <Text className="text-gray-500">No streams found</Text>
                      </View>
                    }
                  />

                  <TouchableOpacity className="p-4 border-t border-gray-200 items-center" onPress={() => setShowStreamModal(false)}>
                    <Text className="text-primary font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}

        {/* Save */}
        <TouchableOpacity
          className="bg-[#FE904B] rounded-xl py-4 px-6 items-center"
          onPress={handleSave}
          disabled={
            isSaving ||
            !selectedClass ||
            !selectedBoard ||
            (selectedClass > 10 && !selectedStream)
          }
          style={{
            opacity:
              isSaving ||
              !selectedClass ||
              !selectedBoard ||
              (selectedClass > 10 && !selectedStream)
                ? 0.5
                : 1,
          }}
        >
          <Text className="text-white font-semibold">{isSaving ? "Saving..." : "Save & Continue"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
