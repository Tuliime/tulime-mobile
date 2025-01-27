import { COLORS } from "@/constants";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type ErrorCardProps = {
  message: string;
};

export const ErrorCard: React.FC<ErrorCardProps> = (props) => {
  return (
    <View style={styles.messageContainer}>
      <MaterialIcons name="error-outline" size={24} color={COLORS.gray8} />
      <Text style={styles.messageText}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.gray6,
    borderRadius: 36,
  },
  messageText: {
    fontWeight: 500,
    textAlign: "center",
    color: COLORS.gray7,
  },
});
