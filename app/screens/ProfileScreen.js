import { useContext } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from "../components/AuthContext";
import Button from "../components/Button";
import NavigateButton from "../components/NavigateButton";

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const navigateEdit = () => navigation.navigate("Edit");
  const navigateWelcome = () => {
    setUser(null);
  };

  return (
    <SafeAreaView className="flex-1 items-center mx-8">
      <View className="self-end">
        <Button title="Edit" onPress={navigateEdit} />
      </View>

      <Image
        className="w-[67] h-[90] mb-12"
        source={require("../assets/logo.png")}
      />

      <Text className="text-2xl font-medium mb-8">Nice To Meet You!</Text>

      <View className="w-[144] h-[144] bg-gray-300 rounded-full justify-center items-center self-center mb-2.5">
        {user.uri ? (
          <Image
            source={{ uri: user.uri }}
            className="w-[144] h-[144] rounded-full my-2.5"
          />
        ) : (
          <MaterialCommunityIcons color="#5E6272" name="camera" size={90} />
        )}
      </View>

      <Text className="text-4xl font-medium text-center">{user.user_name}</Text>

      <Text className="text-2xl font-medium text-center text-gray-400 mb-4">
        {user.position || "Unknown Hero"}
      </Text>

      <NavigateButton title="Explore" />

      <View className="flex-row justify-center">
        <Text className="text-sm font-medium text-gray-400 mb-8">
          Wanna Leave?{" "}
        </Text>
        <Button title="Log Out" onPress={navigateWelcome} />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
