import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { TMessenger } from "@/types/messenger";
import { ProfileAvatar } from "@/components/shared/UI/ProfileAvatar";
import { useAuthStore } from "@/store/auth";
import { Typing } from "./Typing";
import { AppDate } from "@/utils/appDate";
import { COLORS } from "@/constants";
import { truncateString } from "@/utils/truncateString";
import { router } from "expo-router";
import { useMessengerStore } from "@/store/messenger";

type MessengerRoomCardProps = {
  message: TMessenger["message"];
};

export const MessengerRoomCard: React.FC<MessengerRoomCardProps> = (props) => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const isCurrenUserSender: boolean =
    currentUser.id == props.message.sender?.id;

  const roomRecipient = isCurrenUserSender
    ? props.message.recipient!
    : props.message.sender!;

  const updateCurrentRecipient = useMessengerStore(
    (state) => state.updateCurrentRecipient
  );

  const navigateToMessenger = () => {
    updateCurrentRecipient(roomRecipient);
    router.push(`/ecommerce/messenger/${props.message.messengerRoomID}`);
  };

  return (
    <Pressable onPress={navigateToMessenger}>
      <View style={styles.container}>
        <View style={styles.profileAvatarContainer}>
          <ProfileAvatar user={roomRecipient} />
        </View>
        <View style={styles.messageContentContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {truncateString(roomRecipient.name, 24)}
            </Text>
            <Text style={styles.messageTime}>
              {new AppDate(props.message.arrivedAt).time()}
            </Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {truncateString(props.message.text, 40)}
            </Text>
            <Typing />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: COLORS.gray4,
    paddingVertical: 8,
    gap: 8,
  },
  profileAvatarContainer: {},
  messageContentContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 2,
  },
  nameText: { fontSize: 16, fontWeight: 600, color: COLORS.gray8 },
  messageTime: {
    color: COLORS.gray6,
    fontWeight: 400,
    fontSize: 14,
  },
  messageContainer: {},
  message: { color: COLORS.gray6, fontWeight: 400, fontSize: 14 },
});
