import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { useMessengerStore } from "@/store/messenger";
import { SyncLoader } from "@/components/shared/loaders/SyncLoader";
import { Auth } from "@/types/auth";

type TypingProps = {
  showSyncLoader?: boolean;
  user?: Auth["user"];
  onTyping?: (typing: boolean) => void;
};

export const Typing: React.FC<TypingProps> = (props) => {
  const getTypingStatusByUser = useMessengerStore(
    (state) => state.getTypingStatusByUser
  );
  const currentRecipient = useMessengerStore((state) => state.currentRecipient);
  const [showTypingStatus, setShowTypingStatus] = useState<boolean>(false);
  const isUserPropDataProvided: boolean = !!props.user?.id;

  useEffect(() => {
    const updateTypingUsers = () => {
      const now = Date.now();
      const userTypingStatus = isUserPropDataProvided
        ? getTypingStatusByUser(props.user?.id!)
        : getTypingStatusByUser(currentRecipient.id);

      if (!userTypingStatus) return;

      if (now - 3000 <= new Date(userTypingStatus.startedTypingAt).getTime()) {
        setShowTypingStatus(() => true);
        if (!!props.onTyping) props.onTyping(true);
        return;
      }
      setShowTypingStatus(() => false);
      if (!!props.onTyping) props.onTyping(false);
    };

    updateTypingUsers();
    const interval = setInterval(updateTypingUsers, 1000);

    return () => clearInterval(interval);
  }, [getTypingStatusByUser]);

  const hasShowOnlineWordProp =
    props.showSyncLoader === false || props.showSyncLoader === true;

  const showSyncLoader = hasShowOnlineWordProp ? props.showSyncLoader : true;

  return (
    <View>
      {showTypingStatus && (
        <View style={styles.container}>
          <Text style={styles.typingText}>
            Typing{!props.showSyncLoader && "..."}
          </Text>
          {showSyncLoader && (
            <SyncLoader color={COLORS.primary} size={4.5} speed={480} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 2,
  },
  typingText: {
    marginLeft: 2,
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 700,
  },
});
