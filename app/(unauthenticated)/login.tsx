import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GoogleButton from "../../components/GoogleButton";
import { Link } from "expo-router";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="mt-[24] p-4 flex flex-1">
      <View className="bg-gray-50 dark:bg-gray-700 shadow-lg rounded-sm p-4 mt-12 mb-4 flex-[0.7] ">
        <View className="flex-1 space-y-2">
          <Text className="text-3xl dark:text-gray-50 font-bold tracking-tighter leading-8 mb-4">
            Find Jobs you love. Get started now.
          </Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            className="p-2 dark:bg-gray-500 dark:text-gray-200 rounded-lg bg-gray-100"
          />

          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            className="p-2 dark:bg-gray-500 dark:text-gray-200 rounded-lg bg-gray-100"
          />
          <Text className="text-gray-400 text-center font-semibold">
            Don't have an account? Sign up{" "}
            <Link href="/register" className="text-blue-400">
              here
            </Link>
          </Text>
          <Text className="text-gray-400 text-center font-semibold my-4">
            or
          </Text>
          <GoogleButton />
        </View>
      </View>
      <View className="flex-[0.3] justify-end">
        <TouchableOpacity
          onPress={onSignInPress}
          className="p-2 rounded-full w-4/5 self-center mb-4 dark:bg-white bg-gray-100"
        >
          <Text className="text-center text-xl font-semibold capitalize">
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
