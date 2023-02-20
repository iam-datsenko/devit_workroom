import { Text, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      className="w-full bg-amber-400 rounded-2xl items-center py-4 my-8"
      onPress={handleSubmit}
    >
      <Text className="text-base font-medium">{title}</Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;
