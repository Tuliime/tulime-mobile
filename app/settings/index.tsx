import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MainLayout } from "@/components/shared/layout";
import { UpdateAvatar } from "@/components/settings/UpdateAvatar";
import { UpdateUserBasicInfo } from "@/components/settings/updateUserBasicInfo";

const Settings: React.FC = () => {
  return (
    <MainLayout title="Settings">
      <View style={styles.container}>
        <UpdateAvatar />
        <UpdateUserBasicInfo />
        {/* Change password */}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
});

export default Settings;
