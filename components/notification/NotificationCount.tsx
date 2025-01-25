import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/constants";

export const NotificationCount = () => {
  return (
    <View>
      {/* <Text>NotificationCount</Text> */}
      <MaterialIcons name="notifications-none" size={24} color={COLORS.white} />
    </View>
  );
};
