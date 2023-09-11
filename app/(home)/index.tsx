import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  DarkModeComponent,
  HeaderBtnLeft,
  IconButton,
} from "../../components/Header";
import { cn } from "../../constants/tailwindMerge";
import useGetJobs, {
  JobListing,
  SearchParams,
  getJobs,
} from "../../hooks/useGetJobs";
import PopularJobs from "../../components/PopularJobs";
import { useUser } from "@clerk/clerk-expo";

const jobTypes: { type: JobTypes }[] = [
  {
    type: "Full Time",
  },
  { type: "Part Time" },
  { type: "Remote" },
  { type: "Intern" },
];

type JobTypes = "Full Time" | "Part Time" | "Remote" | "Intern";

function getJobTypeFromActiveType(
  type: JobTypes | string
): JobListing["parameters"]["employment_types"] {
  switch (type) {
    case "Full Time":
      return "FULLTIME";
    case "Part Time":
      return "PARTTIME";
    case "Intern":
      return "INTERN";
    // case "Remote":
    //   return "REMOTE";
    default:
      return undefined;
  }
}

export default function Page() {
  const [activeType, setActiveType] = React.useState<JobTypes | "">("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [params, setParams] = React.useState<SearchParams>({
    query: "",
  } as SearchParams);

  const { error, jobs, isLoading, isFetching, status } = useGetJobs(params);

  const onPress = async () => {
    if (!searchQuery) return;
    const employmentType = getJobTypeFromActiveType(activeType);

    const obj: Record<string, any> = {};
    employmentType && (obj["employment_types"] = employmentType);
    activeType === "Remote" && (obj["remote_jobs_only"] = true);

    setParams({
      query: `${searchQuery}, USA`,
      ...obj,
    });
  };

  // console.log(jobs);
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-w justify-center items-center">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-4">
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => <HeaderBtnLeft />,
          headerRight: () => <DarkModeComponent />,
        }}
      />
      {/* TODO: add clerk and use name here */}
      <Text className="text-gray-400 capitalize text-lg font-semibold">
        Hello {user?.firstName || "there"}
      </Text>
      <Text className="font-bold text-2xl dark:text-gray-50">
        Find your perfect job
      </Text>
      <View className="flex flex-row gap-4 my-4">
        <TextInput
          className="border border-gray-100 bg-gray-50 rounded-lg p-2 flex-1 placeholder:text-gray-300
          text-gray-600  dark:bg-gray-600 dark:text-gray-50 dark:border-gray-500"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <IconButton
          name="search"
          color="white"
          className="bg-blue-500 rounded-lg p-2"
          onPress={onPress}
          size={28}
        />
      </View>
      <FlatList
        data={jobTypes}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={cn(
              "rounded-2xl border py-2 px-4  dark:border-gray-100",
              activeType === item.type && "bg-black dark:bg-white"
            )}
            onPress={() => {
              setActiveType(item.type);
              if (!searchQuery) return;
              const obj: Record<string, any> = {};
              item.type === "Remote" && (obj["remote_jobs_only"] = true);
              setParams((prev) => ({
                ...prev,
                employment_types: getJobTypeFromActiveType(activeType),
                ...obj,
              }));
            }}
          >
            <Text
              className={cn(
                "text-gray-600 font-semibold dark:text-gray-200",
                activeType === item.type && "text-white dark:text-black"
              )}
            >
              {item.type}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        contentContainerStyle={{ columnGap: 8 }}
      />
      {isLoading && isFetching && (
        <Text className="text-blue-400">Loading...</Text>
      )}
      <PopularJobs jobs={jobs} />
      {jobs && (
        <TouchableOpacity
          className="px-8 py-2  bg-blue-400 rounded-full w-1/2 self-center"
          onPress={() => {
            setParams((prev) => ({
              ...prev,
              page: `${Number(prev.page || 1) + 1}`,
            }));
          }}
          disabled={isLoading}
        >
          <Text className="text-center text-base font-semibold text-white">
            Load More
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
