import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UpdateAvatar } from "@/components/settings/UpdateAvatar";
import { UpdateUserBasicInfo } from "@/components/settings/updateUserBasicInfo";
import { ChangePassword } from "@/components/settings/ChangePassword";
import { PushNotification } from "@/components/settings/PushNotification";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const Settings: React.FC = () => {
  return (
    <MainLayout title="Settings">
      <View style={styles.container}>
        <UpdateAvatar />
        <UpdateUserBasicInfo />
        <PushNotification />
        <ChangePassword />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
});

export default Settings;
