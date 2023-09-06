import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  JobDetailsResponse,
  useFetchJobDetails,
} from "../../../hooks/useFetchJobDetails";
import { Image } from "expo-image";
import { cn } from "../../../constants/tailwindMerge";

export default function JobDetails() {
  const params: { jobId: string } = useLocalSearchParams();
  const { isLoading, jobDetails } = useFetchJobDetails(params.jobId);
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabType>("About");

  //   console.log(params.jobId);
  console.log(activeTab);

  const onRefresh = () => {};

  if (isLoading || !jobDetails) {
    return (
      <SafeAreaView className="flex-w justify-center items-center">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-4 flex-1">
      <Stack.Screen
        options={{
          title: "Job Details",
          headerShadowVisible: false,
        }}
      />
      <CompanyDetails data={jobDetails?.data[0]} />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <View className="flex-1 ">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* TODO: make tabs more generic */}
          {activeTab === "About" && <AboutTab data={jobDetails?.data[0]} />}
          {activeTab === "Qualifications" && (
            <QualificationsTab data={jobDetails?.data[0]} />
          )}
          {activeTab === "Responsibilities" && (
            <ResponsibilitiesTab data={jobDetails?.data[0]} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

interface CompanyDetailsProps {
  data: JobDetailsResponse["data"][number];
}

function CompanyDetails({ data }: CompanyDetailsProps) {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <View className="items-center mt-4">
      <Image
        source={data.employer_logo || blurhash}
        placeholder={blurhash}
        className="w-16 h-16 rounded-lg mb-4"
        contentFit="contain"
      />
      <Text className="text-center text-2xl font-bold tracking-tighter leading-6 dark:text-gray-100">
        {data.job_title}
      </Text>
      <Text className="text-base text-center text-gray-400 font-semibold dark:text-gray-300">
        {data.employer_name}, {data.job_country}
      </Text>
    </View>
  );
}

type TabType = "About" | "Qualifications" | "Responsibilities";

const tabs: TabType[] = ["About", "Qualifications", "Responsibilities"];

interface TabsProps {
  activeTab: TabType;
  onTabChange: React.Dispatch<React.SetStateAction<TabType>>;
}

function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <View>
      <ScrollView
        className="flex flex-row gap-x-4 py-2"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            onPress={() => onTabChange(tab)}
            key={tab}
            className={cn(
              "py-4 px-6 rounded-full bg-gray-50",
              activeTab === tab && "bg-blue-400 "
            )}
          >
            <Text
              className={cn(
                "text-base font-light tracking-wide text-gray-500",
                activeTab === tab && "text-white"
              )}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

type AboutTabProps = CompanyDetailsProps;

function AboutTab({ data }: AboutTabProps) {
  //   console.log(data.job_description);
  return (
    <View>
      <Text className="text-gray-600 text-base leading-6 dark:text-gray-100">
        {data.job_description}
      </Text>
    </View>
  );
}

type QualificationsTabProps = CompanyDetailsProps;

function QualificationsTab({ data }: QualificationsTabProps) {
  return (
    <View className="space-y-3">
      {data.job_highlights.Qualifications.map((qualification, i) => (
        <Text
          className="text-gray-600 text-base leading-5 dark:text-gray-100"
          key={i}
        >
          {qualification}
        </Text>
      ))}
    </View>
  );
}

type ResponsibilitiesTabProps = CompanyDetailsProps;

function ResponsibilitiesTab({ data }: ResponsibilitiesTabProps) {
  console.log(data.job_required_skills);
  if (!data.job_required_skills) return <View></View>;
  return (
    <View className="space-y-3">
      {data.job_required_skills.map((req, i) => (
        <Text
          className="text-gray-600 dark:text-gray-100 text-base leading-5"
          key={i}
        >
          {req}
        </Text>
      ))}
    </View>
  );
}
