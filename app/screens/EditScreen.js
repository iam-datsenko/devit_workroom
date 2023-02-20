import { useContext, useState } from "react";
import {
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
import FormImagePicker from "../components/FormImagePicker";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(10).label("Phone"),
  position: Yup.string().label("Position"),
  skype: Yup.string().label("Skype"),
});

function EditScreen({ navigation }) {
  const { db, setUser, user } = useContext(AuthContext);
  const [editFailed, setEditFailed] = useState(false);

  const navigateProfile = () => navigation.goBack();

  const updateUser = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (_txObj, results) => {
          setUser(results.rows._array[0]);
          navigation.navigate("Profile");
        }
      );
    });
  };

  const handleSubmit = (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET " +
          "user_name = ?, email = ?, uri = ?, phone = ?, position = ?, skype = ? " +
          "WHERE id = ?",
        [
          values.user_name,
          values.email,
          values.uri,
          values.phone,
          values.position,
          values.skype,
          user.id,
        ],
        (_txObj, resultSet) => {
          if (resultSet.rowsAffected) {
            updateUser(user.id);
          } else {
            setEditFailed(true);
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
        <View className="flex-row sticky w-full self-start items-center py-2">
          <Button title="❮ Back" onPress={navigateProfile} />

          <Text className="text-lg font-medium px-9">Edit Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator="false">
          <Form
            initialValues={{
              uri: user.uri || "",
              user_name: user.user_name || "",
              email: user.email || "",
              phone: user.phone || "",
              position: user.position || "",
              skype: user.skype || "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name="uri" />

            <Text className="text-2xl font-medium text-center">
              {user.user_name}
            </Text>

            <Text className="text-sm font-medium text-center text-gray-400 mb-8">
              {user.position || "Unknown Hero"}
            </Text>

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
              editable={false}
              keyboardType="email-address"
              name="email"
              placeholder="Your Email *"
              selectTextOnFocus={false}
              textContentType="emailAddress"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              keyboardType="phone-pad"
              name="phone"
              placeholder="Phone *"
              selectTextOnFocus={false}
              textContentType="phone"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="position"
              placeholder="Position"
              textContentType="position"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="skype"
              placeholder="Skype"
              textContentType="skype"
            />

            <ErrorMessage
              error="Edit process failed. Try again later."
              visible={editFailed}
            />

            <SubmitButton title="Save" />
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EditScreen;
