import { Text, TouchableOpacity } from "react-native";

function Button({ onPress, opacity, title }) {
  return (
    <TouchableOpacity
      className={
        opacity
          ? "w-full bg-amber-300 rounded-2xl items-center py-4"
          : "w-full bg-amber-400 rounded-2xl items-center py-4 my-8"
      }
      onPress={onPress}
    >
      <Text className="text-sm font-medium">{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
