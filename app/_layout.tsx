import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useUser,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import {
  DarkModeContext,
  DarkModeProvider,
  useDarkModeContext,
} from "../hooks/DarkModeContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "white",
  },
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  // console.log(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
      tokenCache={tokenCache}
    >
      <DarkModeProvider>
        <NavigationStack />
      </DarkModeProvider>
    </ClerkProvider>
  );
}

function NavigationStack() {
  const { isDarkMode } = useDarkModeContext();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={isDarkMode ? DarkTheme : CustomLightTheme}>
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
