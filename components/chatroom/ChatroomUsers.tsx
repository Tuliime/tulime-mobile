import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { addCommasToNumber } from "@/utils";
import { COLORS } from "@/constants";

export const ChatroomUsers: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.onlineUsersContainer}>
        <Text style={styles.onlineUsersNumber}>{addCommasToNumber(235)} </Text>
        <View style={styles.onlineDot}></View>

        <Text style={styles.onlineUsersLabel}>Online</Text>
      </View>
      <View style={styles.seperationDot}></View>
      <View style={styles.totalUsersContainer}>
        <Text style={styles.totalUsersNumber}>{addCommasToNumber(2568)}</Text>
        <Text style={styles.totalUsersLabel}>Total </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  onlineUsersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineUsersNumber: {
    fontSize: 12,
    color: COLORS.gray6,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginLeft: 4,
  },
  onlineUsersLabel: {
    fontSize: 12,
    color: COLORS.gray6,
    marginLeft: 4,
  },
  seperationDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.gray7,
  },
  totalUsersContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  totalUsersNumber: {
    fontSize: 12,
    color: COLORS.gray6,
  },
  totalUsersLabel: {
    fontSize: 12,
    color: COLORS.gray6,
  },
});
