import { TChatbot } from "@/types/chatbot";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { COLORS, icons } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppDate } from "@/utils/appDate";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.88;

export const BotMessage: React.FC<TChatbot["message"]> = (props) => {
  const messageTime = new AppDate(props.createdAt).time();

  return (
    <View style={styles.Container}>
      <View style={styles.botIconContainer}>
        <Image source={icons.bot} resizeMode="contain" style={styles.botIcon} />
      </View>
      <View style={styles.messageContainer}>
        <AntDesign
          name="caretup"
          size={24}
          color={COLORS.gray4}
          style={styles.triangleIcon}
        />
        <Text style={styles.messageText}>{props.message}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    gap: 8,
    alignItems: "flex-start",
  },
  botIconContainer: {
    backgroundColor: COLORS.gray4,
    width: 44,
    height: 44,
    padding: 16,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  botIcon: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
  messageContainer: {
    width: "auto",
    maxWidth: maxWidth,
    backgroundColor: COLORS.gray4,
    padding: 16,
    paddingBottom: 28,
    borderRadius: 12,
    position: "relative",
  },
  triangleIcon: {
    position: "absolute",
    left: 12,
    top: -10,
  },
  messageText: {
    color: COLORS.gray8,
    fontSize: 16,
  },
  messageTime: {
    color: COLORS.gray6,
    position: "absolute",
    right: 12,
    bottom: 8,
  },
});
