import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PushNotification } from "@/components/settings/PushNotification";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { AuthenticatedUser } from "@/components/auth/UI/AuthenticatedUser";
import Feather from "@expo/vector-icons/Feather";
import { COLORS } from "@/constants";
import { router } from "expo-router";

const Settings: React.FC = () => {
  const navigateToProfile = () => {
    router.push("/profile");
  };
  return (
    <MainLayout title="Settings">
      <View style={styles.container}>
        <View style={styles.authUserContainer}>
          <Text style={styles.authUserHeading}>Profile</Text>
          <View style={styles.authUserContent}>
            <AuthenticatedUser />
            <TouchableOpacity
              style={styles.editContainer}
              onPress={navigateToProfile}
            >
              <Feather name="edit-2" size={16} color={COLORS.gray8} />
            </TouchableOpacity>
          </View>
        </View>
        <PushNotification />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  authUserContainer: {
    gap: 12,
  },
  authUserHeading: {
    fontSize: 20,
    color: COLORS.gray8,
    textAlign: "left",
  },
  authUserContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 8,
  },
  editContainer: {
    backgroundColor: COLORS.gray4,
    padding: 12,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
});

export default Settings;
