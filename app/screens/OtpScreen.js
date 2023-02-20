import { useState } from "react";
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

import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/From";
import FormCode from "../components/FormCode";
import SubmitButton from "../components/SubmitButton";

import { checkVerification } from "../api/verify";

const validationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).label("Code"),
});

function OtpScreen({ navigation, route }) {
  const { phoneNumber } = route.params;
  const [confirmationFailed, setConfirmationFailed] = useState(false);

  const navigateWelcome = () => navigation.navigate("Welcome");

  const handleSubmit = (values) => {
    checkVerification(phoneNumber, values.code).then((success) => {
      if (!success) setConfirmationFailed(true);
      success && navigation.replace("LogIn");
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

          <Text className="text-2xl font-medium self-center mb-8">
            Confirm Your Code
          </Text>

          <Form
            initialValues={{
              code: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormCode
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
            />

            <ErrorMessage
              error="OTP code is invalid."
              visible={confirmationFailed}
            />

            <SubmitButton title="Confirm" />
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default OtpScreen;
