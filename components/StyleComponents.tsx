import {
  ActivityIndicator,
  ActivityIndicatorProps,
  SafeAreaView,
  Text,
} from "react-native";
import { styled } from "nativewind";

const Container = styled(SafeAreaView, "flex-1 p-4 pt-[24]");
const H1 = styled(
  Text,
  "text-4xl font-bold tracking-tighter dark:text-gray-50"
);

const H2 = styled(
  Text,
  "text-2xl font-bold tracking-tighter dark:text-gray-50"
);
const H3 = styled(Text, "text-xl font-bold tracking-tighter dark:text-gray-50");

const Body = styled(Text, "text-base dark:text-gray-50");

export const Layout = {
  Container,
};

export const Typography = {
  H1,
  H2,
  H3,
  Body,
};

interface LoadingScreenProps extends ActivityIndicatorProps {}

export const LoadingScreen = ({
  size = "large",
  ...props
}: LoadingScreenProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} {...props} />
    </SafeAreaView>
  );
};
