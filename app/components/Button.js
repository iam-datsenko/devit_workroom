import { Text, TouchableOpacity } from "react-native";

function Button({ onPress, title }) {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <Text className="text-sm font-medium text-amber-400">{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
