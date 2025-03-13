import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getExpoPushToken } from "./getExpoPushToken"; // Import the function

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getExpoPushToken();
      setExpoPushToken(token);
    };
    fetchToken();
  }, []);

  return (
    <View>
      <Text>Expo Push Token: {expoPushToken ?? "Fetching..."}</Text>
    </View>
  );
};

export default Notification;
