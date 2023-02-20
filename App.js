import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/components/AuthContext";
import OfflineNotice from "./app/components/OfflineNotice";

SplashScreen.preventAutoHideAsync();

const db = SQLite.openDatabase("app.db");

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "users " +
          "(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
          "user_name TEXT, email TEXT, password TEXT, phone TEXT, position TEXT, skype TEXT, code TEXT, uri TEXT)"
      );
    });

    setIsReady(true);
  };

  useEffect(() => {
    createTable();
  }, [db]);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View onLayout={onLayoutRootView} className="flex-1">
      <AuthContext.Provider value={{ db, user, setUser }}>
        <OfflineNotice />

        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
