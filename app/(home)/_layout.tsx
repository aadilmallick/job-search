import { Slot, Stack } from "expo-router";
import React from "react";
import { useDarkModeContext } from "../../hooks/DarkModeContext";

const HomeLayout = () => {
  const { isDarkMode } = useDarkModeContext();
  return (
    <Stack
      screenOptions={{
        //TODO: explain this
        // "dark" refers to color of statusbar items as gray, so you want this on light mode
        // "light" renders statusbar items as white, so you want this on dark mode
        statusBarStyle: !isDarkMode ? "dark" : "light",
        // need status bar to be transculcent
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="profile"
        // TODO: explain this
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="job-details/[jobId]"
        options={{
          title: "Job Details",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
