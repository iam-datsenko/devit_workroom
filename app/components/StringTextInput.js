import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

function StringTextInput({ icon, placeholder, ...otherProps }) {
  const [isHide, setIsHide] = useState(true);

  return (
    <View className="w-full border-b border-gray-300 py-3 mb-2">
      <Text className="text-sm font-medium text-gray-400">{placeholder}</Text>

      <View className="flex-row justify-between">
        <TextInput
          className="text-base font-medium w-[220]"
          secureTextEntry={isHide && icon}
          {...otherProps}
        />

        {icon && (
          <TouchableWithoutFeedback onPress={() => setIsHide(!isHide)}>
            <Image
              className="w-[24] h-[24]"
              source={
                isHide
                  ? require("../assets/hide.png")
                  : require("../assets/show.png")
              }
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

export default StringTextInput;
