import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<any>(null);

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the verification email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="p-4 pt-[48]">
      {/* when we are not waiting pending verification, show email and password fiels */}
      {!pendingVerification && (
        <View className="space-y-4">
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
              className="p-2 dark:bg-gray-500 dark:text-gray-200 rounded-lg bg-gray-100"
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={false}
              onChangeText={(password) => setPassword(password)}
              className="p-2 dark:bg-gray-500 dark:text-gray-200 rounded-lg bg-gray-100"
            />
          </View>

          <TouchableOpacity
            onPress={onSignUpPress}
            className="bg-blue-400  px-8 py-2 rounded-full self-start"
          >
            <Text className="text-white text-lg font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* When we are waiting for email verification, we will render a one-time code textinput */}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
              className="p-2 dark:bg-gray-500 dark:text-gray-200 rounded-lg bg-gray-100"
            />
          </View>
          <TouchableOpacity
            onPress={onPressVerify}
            className="bg-green-400  px-8 py-2 rounded-full self-start"
          >
            <Text className="text-white text-lg font-semibold">
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
