import { TNotification } from "@/types/notification";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";

type NotificationCardProps = {
  notification: TNotification["notification"];
};

export const NotificationCard: React.FC<NotificationCardProps> = (props) => {
  const isChatType: boolean = props.notification.type === "chat";

  return (
    <View style={styles.container}>
      {isChatType && (
        <Ionicons
          name="chatbubble-ellipses-sharp"
          size={28}
          color={COLORS.gray7}
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{props.notification.title}</Text>
        <Text style={styles.contentDescription}>{props.notification.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: COLORS.gray3,
    borderRadius: 8,
    padding: 8,
    paddingLeft: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  contentTitle: {
    color: COLORS.gray7,
    fontSize: 16,
    fontWeight: 500,
  },
  contentDescription: {
    color: COLORS.gray7,
    fontSize: 12,
  },
});
