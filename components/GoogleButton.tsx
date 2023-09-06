import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId && setActive) {
        console.log("did it?");
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <TouchableOpacity
        className="p-2 rounded-full flex flex-row items-center justify-center gap-x-2 bg-white shadow-lg"
        onPress={onPress}
      >
        <Text className="font-semibold text-lg">Sign in with Google</Text>
        <FontAwesome name="google" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
}
