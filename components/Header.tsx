import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDarkModeContext } from "../hooks/DarkModeContext";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";

interface IconButtonProps extends TouchableOpacityProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  onPress: () => void;
  color?: string;
  size?: number;
}

export function IconButton({
  onPress,
  className = "",
  color = "black",
  name,
  size = 24,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity className={className} onPress={onPress} {...props}>
      <FontAwesome size={size} name={name} color={color} />
    </TouchableOpacity>
  );
}

export function HeaderBtnLeft() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <ActivityIndicator size={"small"} />;
  }

  if (user?.hasImage) {
    return (
      <TouchableOpacity
        className="bg-gray rounded-full p-2"
        onPress={() => {
          router.push("/profile");
        }}
      >
        <Image
          className="h-8 w-8 rounded-full"
          source={user.imageUrl}
          contentFit="cover"
        />
      </TouchableOpacity>
    );
  }
  return (
    <IconButton
      name="bars"
      onPress={() => {
        router.push("/profile");
      }}
      color="gray"
      className="p-2 rounded-md bg-gray-300/80 dark:bg-gray-700/80"
    />
  );
}

export function DarkModeComponent() {
  const { isDarkMode, toggleMode } = useDarkModeContext();
  const iconName = isDarkMode ? "sun-o" : "moon-o";
  const iconColor = isDarkMode ? "orange" : "#1111DD";
  return (
    <IconButton
      name={iconName}
      color={iconColor}
      onPress={() => {
        console.log("toggle");
        toggleMode();
      }}
      className="bg-gray-300/80 dark:bg-gray-700/80 p-2 rounded-md"
    />
  );
}
