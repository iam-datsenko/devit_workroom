import { Text } from "react-native";
import { useFormikContext } from "formik";
import PhoneInput from "react-native-phone-number-input";

import ErrorMessage from "./ErrorMessage";

function FormPhone({ name, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Text className="font-medium text-sm text-gray-400 mb-2">
        Phone Number
      </Text>

      <PhoneInput
        onChangeFormattedText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPhone;
