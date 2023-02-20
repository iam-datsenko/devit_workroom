import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditScreen from "../screens/EditScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Edit" component={EditScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
