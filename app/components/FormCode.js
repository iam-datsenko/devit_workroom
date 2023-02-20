import { Text } from "react-native";
import { useFormikContext } from "formik";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import ErrorMessage from "./ErrorMessage";

function FormCode({ name, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Text className="text-sm font-medium text-gray-400 mb-2 mt-2">Code</Text>

      <OTPInputView
        onCodeFilled={(code) => setFieldValue(name, code)}
        value={values[name]}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormCode;
