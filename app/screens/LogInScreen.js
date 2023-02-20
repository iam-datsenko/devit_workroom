import { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";

import AuthContext from "../components/AuthContext";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/From";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LogInScreen({ navigation }) {
  const { db, setUser } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigateSignUp = () => navigation.replace("SignUp");
  const navigateWelcome = () => navigation.goBack();

  const handleSubmit = (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [values.email, values.password],
        (_txObj, results) => {
          const exist = results.rows._array.length;

          if (exist) {
            setUser(results.rows._array[0]);
          } else {
            setLoginFailed(true);
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
        <ScrollView className="flex-1">
          <View className="self-start z-20">
            <Button title="❮ Back" onPress={navigateWelcome} />
          </View>

          <Image
            className="w-[67] h-[90] self-center mb-12"
            source={require("../assets/logo.png")}
          />

          <Text className="text-2xl font-medium mb-8">Log In To Woorkroom</Text>

          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
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

            <Text className="text-sm font-normal text-gray-400 self-end mb-12">
              Forgot password?
            </Text>

            <ErrorMessage
              error="Invalid email and/or password."
              visible={loginFailed}
            />

            <SubmitButton title="Log In" />

            <View className="flex-row justify-center">
              <Text className="text-sm font-medium text-gray-400">
                New User?{" "}
              </Text>
              <Button title="Create Account" onPress={navigateSignUp} />
            </View>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LogInScreen;
