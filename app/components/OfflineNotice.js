import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice() {
  const [isVisible, setIsVisible] = useState(false);

  const netInfo = useNetInfo();
  const top = Constants.statusBarHeight;

  const showNotice = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 10000);
  };

  useEffect(() => {
    showNotice();
  }, []);

  if (
    isVisible &&
    netInfo.type !== "unknown" &&
    netInfo.isInternetReachable === false
  )
    return (
      <View
        className={`absolute z-10 w-full h-[50] items-center justify-center bg-red-600/75 top-[${top}]`}
      >
        <Text className="text-white font-medium text-center">
          No Internet Connection
        </Text>
      </View>
    );

  return null;
}

export default OfflineNotice;
