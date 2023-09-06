import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import useGetJobs, { JobListing } from "../hooks/useGetJobs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
// import Image from "expo-"

export default function PopularJobs({ jobs }: { jobs?: JobListing }) {
  // const {} = useGetJobs({});
  const router = useRouter();
  if (!jobs) return null;

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <FlatList
      horizontal
      data={jobs.data}
      keyExtractor={(item) => item.job_id}
      className="py-4"
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="bg-gray-50 rounded-lg p-4 shadow-lg w-64 dark:bg-gray-800 space-y-2">
          <TouchableOpacity
            className="bg-gray-300 w-16 h-16 rounded-lg overflow-hidden"
            onPress={() => router.push(`/job-details/${item.job_id}`)}
          >
            <Image
              source={item.employer_logo || blurhash}
              placeholder={blurhash}
              transition={1000}
              contentFit="contain"
              className="w-full h-full object-contain"
            />
          </TouchableOpacity>
          <Text className="text-gray-400 font-semibold">
            {item.employer_name}, {item.job_country}
          </Text>
          <Text className="text-lg font-bold dark:text-gray-500 leading-5 tracking-tighter">
            {item.job_title}
          </Text>
        </View>
      )}
      contentContainerStyle={{
        columnGap: 16,
      }}
    />
  );
}
