import { Slot, Stack } from "expo-router";
import React from "react";
import { DarkModeComponent } from "../../components/Header";
import { useDarkModeContext } from "../../hooks/DarkModeContext";

const _layout = () => {
  const { isDarkMode } = useDarkModeContext();
  return (
    <Stack
      screenOptions={{
        // "dark" refers to color of statusbar items as gray, so you want this on light mode
        // "light" renders statusbar items as white, so you want this on dark mode
        statusBarStyle: !isDarkMode ? "dark" : "light",
        // need status bar to be transculcent
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
