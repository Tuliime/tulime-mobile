import { COLORS } from "@/constants";
import { TMessenger } from "@/types/messenger";
import { AppDate } from "@/utils/appDate";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

type MessageDayProps = {
  message: TMessenger["organizedMessage"];
};

export const MessageDay: React.FC<MessageDayProps> = (props) => {
  const hasDate: boolean = !!props.message.arrivedAt;
  const day = hasDate ? props.message.arrivedAt : props.message.sentAt;
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer} />
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{new AppDate(day).day()}</Text>
      </View>
      <View style={styles.lineContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 24,
    gap: 8,
  },
  dateContainer: {
    backgroundColor: COLORS.gray4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: 500,
  },
  lineContainer: {
    flex: 1,
    backgroundColor: COLORS.gray5,
    height: 1,
  },
});
