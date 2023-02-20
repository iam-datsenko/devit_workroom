import { Image, SafeAreaView, Text } from "react-native";

import NavigateButton from "../components/NavigateButton";

function WelcomeScreen({ navigation }) {
  const navigateLogin = () => navigation.navigate("LogIn");
  const navigateSignUp = () => navigation.navigate("SignUp");

  return (
    <SafeAreaView className="flex-1 items-center mx-8">
      <Image
        className="w-[67] h-[90] mt-6 mb-12"
        source={require("../assets/logo.png")}
      />

      <Text className="text-2xl font-medium text-center mb-20">
        Welcome To Woorkroom
      </Text>

      <NavigateButton title="Log In" onPress={navigateLogin} />

      <NavigateButton title="Sign Up" onPress={navigateSignUp} opacity={true} />
    </SafeAreaView>
  );
}

export default WelcomeScreen;
