import { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";

import AuthContext from "../components/AuthContext";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/From";
import FormField from "../components/FormField";
import FormPhone from "../components/FormPhone";
import SubmitButton from "../components/SubmitButton";

import { sendSmsVerification } from "../api/verify";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required()
    .min(13, "Phone must be a valid phone number")
    .max(13, "Phone must be a valid phone number")
    .label("Phone"),
  user_name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm password"),
});

function SignUpScreen({ navigation }) {
  const { db } = useContext(AuthContext);
  const [signupFailed, setSignupFailed] = useState(false);

  const navigateLogin = () => navigation.replace("LogIn");
  const navigateWelcome = () => navigation.goBack();

  const addUser = (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users " +
          "(phone, code, user_name, email, password) VALUES (?,?,?,?,?)",
        [
          values.phone,
          values.code,
          values.user_name,
          values.email,
          values.password,
        ],
        (_txObj) => {
          sendSmsVerification(values.phone).then(() => {
            navigation.replace("Otp", { phoneNumber: values.phone });
          });
        }
      );
    });
  };

  const handleSubmit = (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT email FROM users WHERE email = ?",
        [values.email],
        (_txObj, results) => {
          const exist = results.rows.length;

          if (!exist) {
            addUser(values);
          } else {
            setSignupFailed(true);
          }
        }
      );
    });
  };

  return (
    <SafeAreaView className="flex-1 mx-8">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="self-start">
          <Button title="❮ Back" onPress={navigateWelcome} />
        </View>

        <ScrollView showsVerticalScrollIndicator="false">
          <Image
            className="w-[67] h-[90] self-center mb-12"
            source={require("../assets/logo.png")}
          />

          <Text className="text-2xl font-medium mb-8">
            Sign Up To Woorkroom
          </Text>

          <Form
            initialValues={{
              phone: "",
              user_name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormPhone
              containerStyle={{
                backgroundColor: "transparent",
                marginBottom: 10,
              }}
              countryPickerButtonStyle={{
                color: "red",
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#D1D5DB",
                marginRight: 10,
                color: "red",
                width: 90,
              }}
              defaultCode="UA"
              layout="second"
              name="phone"
              placeholder="000000000"
              renderDropdownImage={
                <Image
                  className="w-[24] h-[24]"
                  source={require("../assets/chevron.png")}
                />
              }
              textContainerStyle={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#D1D5DB",
                backgroundColor: "transparent",
              }}
            />

            {/* <FormCode
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                borderRadius: 15,
                borderColor: "#D1D5DB",
                color: "#000000",
              }}
              codeInputHighlightStyle={{ borderColor: "#FCD34D" }}
              name="code"
              pinCount={4}
              style={{ width: "100%", height: 50, marginBottom: 8 }}
            /> */}

            <FormField
              autoCapitalize="auto"
              autoCorrect={false}
              name="user_name"
              placeholder="Your Name"
              textContentType="user_name"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Your Email"
              textContentType="emailAddress"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon={true}
              name="password"
              placeholder="Password"
              textContentType="password"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon={true}
              name="confirm_password"
              placeholder="Confirm Password"
              textContentType="confirm_password"
            />

            <ErrorMessage
              error="Account already registered, please log in."
              visible={signupFailed}
            />

            <SubmitButton title="Next" />

            <View className="flex-row justify-center">
              <Text className="text-sm font-medium text-gray-400 mb-8">
                Have Account?{" "}
              </Text>
              <Button title="Log In" onPress={navigateLogin} />
            </View>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUpScreen;
