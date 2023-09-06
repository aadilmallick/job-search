import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function profile() {
  const { signOut, isLoaded } = useAuth();
  const router = useRouter();
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4 pt-[48] dark:bg-gray-700/80 bg-white/80">
      <>
        <Text className="dark:text-white capitalize text-xl font-bold">
          profile
        </Text>
        <TouchableOpacity
          className="bg-gray-400  py-2 px-4 font-semibold rounded-lg self-start"
          onPress={() => signOut()}
        >
          <Text className="text-gray-200">Sign Out</Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
}
