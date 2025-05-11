import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { useNetworkStatus, CONNECTION_STATUS } from "./useNetworkStatus";
import { COLORS } from "@/constants";

const { width } = Dimensions.get("window");

export const NetworkStatusCard = () => {
  const connectionStatus = useNetworkStatus();

  const [visible, setVisible] = useState(true);
  const [prevStatus, setPrevStatus] = useState(connectionStatus);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Clear any existing timeout when status changes
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    // Reset animation
    fadeAnim.setValue(1);
    setVisible(true);

    // If status changed to online, set timeout to hide
    if (connectionStatus === CONNECTION_STATUS.ONLINE) {
      const id = setTimeout(() => {
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      }, 5000); // Show for 5 seconds

      setTimeoutId(id);
    }

    setPrevStatus(connectionStatus);
  }, [connectionStatus]);

  const getCardStyle = () => {
    switch (connectionStatus) {
      case CONNECTION_STATUS.ONLINE:
        return styles.cardOnline;
      case CONNECTION_STATUS.CONNECTING:
      case CONNECTION_STATUS.OFFLINE:
      default:
        return styles.cardOffline;
    }
  };

  if (!visible) return null;

  return (
    <View style={[styles.card, getCardStyle()]}>
      <Text style={styles.statusText}>{connectionStatus.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardOnline: {
    backgroundColor: COLORS.primary,
  },
  cardOffline: {
    backgroundColor: COLORS.gray9,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
