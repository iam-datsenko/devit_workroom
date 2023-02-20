import { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onAddImage }) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) alert("You need to enable permissiom to access the library.");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handlePress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) onAddImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View className="w-[70] h-[70] bg-gray-300 rounded-full justify-center items-center self-center my-2.5">
          {imageUri ? (
            <>
              <Image
                source={{ uri: imageUri }}
                className="w-[70] h-[70] rounded-full my-2.5"
              />

              <Image
                source={require("../assets/edit.png")}
                className="absolute bottom-0 right-0 w-[24] h-[24]"
              />
            </>
          ) : (
            <MaterialCommunityIcons color="#5E6272" name="camera" size={50} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default ImageInput;
