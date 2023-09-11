import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { IconButton } from "../../components/Header";
import colors from "tailwindcss/colors";
import { useQuery } from "@tanstack/react-query";
import SQLiteDB from "../../constants/SQLiteDB";
import { Image } from "expo-image";

export default function profile() {
  const { signOut, isLoaded } = useAuth();
  const router = useRouter();

  const {
    data: jobs,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favoriteJobs"],
    queryFn: async () => {
      const result = await SQLiteDB.getAllJobs();
      return result.data;
    },
  });

  if (!isLoaded || isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  // TODO: try useQuery hook here
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <SafeAreaView className="flex-1 pt-[48] bg-white/80 dark:bg-gray-700/80  relative">
      <Text className="dark:text-white capitalize text-xl font-bold pl-4">
        profile
      </Text>
      <TouchableOpacity
        className="bg-gray-400  dark:bg-gray-800 py-2 px-4 font-semibold rounded-lg self-start pl-4"
        onPress={() => signOut()}
      >
        <Text className="text-gray-200">Sign Out</Text>
      </TouchableOpacity>
      <IconButton
        name="backward"
        onPress={() => router.back()}
        className="bg-white dark:bg-gray-700 absolute top-8 right-4 p-2 rounded-full"
        color={colors.blue["300"]}
        style={{ elevation: 10 }}
      />
      <ScrollView
        className="rounded-lg h-1/2"
        contentContainerStyle={{
          padding: 24,
          rowGap: 12,
        }}
      >
        {jobs?.map((job) => (
          <TouchableOpacity
            key={job.job_id}
            className="flex flex-row items-center bg-neutral-100 dark:bg-neutral-700 p-1 gap-x-2"
            style={{ elevation: 10 }}
            onPress={() => router.replace(`/job-details/${job.job_id}`)}
          >
            <Image
              source={job.employer_logo || blurhash}
              className="w-16 h-16 rounded-lg"
              contentFit="contain"
              placeholder={blurhash}
            />
            <View className="space-y-1 flex-1">
              <Text className="text-lg font-bold tracking-tight leading-5 dark:text-gray-500">
                {job.employer_name}
              </Text>
              <Text className="dark:text-gray-300">{job.job_title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
