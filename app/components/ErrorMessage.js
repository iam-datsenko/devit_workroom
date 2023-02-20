import { Text } from "react-native";

function ErrorMessage({ error, visible }) {
  if (!error || !visible) return null;

  return <Text className="text-red-600 text-center">{error}</Text>;
}

export default ErrorMessage;
