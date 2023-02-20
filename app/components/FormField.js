import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import StringTextInput from "./StringTextInput";

function FormField({ icon, name, placeholder, ...otherProps }) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();

  return (
    <>
      <StringTextInput
        icon={icon}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        placeholder={placeholder}
        value={values[name]}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
