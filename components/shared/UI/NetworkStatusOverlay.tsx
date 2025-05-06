import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CONNECTION_STATUS, useNetworkStatus } from "@/hooks/useNetworkStatus";
import { COLORS } from "@/constants";
import { SecondaryLayout } from "../layout/SecondaryLayout";

const { width, height } = Dimensions.get("window");

export const NetworkStatusOverlay = () => {
  const connectionStatus = useNetworkStatus();

  if (connectionStatus === CONNECTION_STATUS.ONLINE) {
    return null;
  }

  return (
    <SecondaryLayout title={"Tulime"}>
      <View style={styles.overlay}>
        <MaterialIcons
          name={
            connectionStatus === CONNECTION_STATUS.OFFLINE
              ? "signal-wifi-off"
              : "sync"
          }
          size={80}
          color={COLORS.gray8}
        />
        <Text style={styles.statusText}>
          {connectionStatus === CONNECTION_STATUS.OFFLINE
            ? "No Internet Connection"
            : "Connecting to Internet..."}
        </Text>
        {connectionStatus === CONNECTION_STATUS.OFFLINE && (
          <Text style={styles.subText}>
            Please check your internet connection and try again
          </Text>
        )}
      </View>
    </SecondaryLayout>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: COLORS.gray1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  statusText: {
    color: COLORS.gray8,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  subText: {
    color: COLORS.gray6,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
