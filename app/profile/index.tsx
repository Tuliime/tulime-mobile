import React from "react";
import { View, StyleSheet } from "react-native";
import { UpdateAvatar } from "@/components/settings/UpdateAvatar";
import { UpdateUserBasicInfo } from "@/components/settings/updateUserBasicInfo";
import { ChangePassword } from "@/components/settings/ChangePassword";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const Profile: React.FC = () => {
  return (
    <MainLayout title="Profile">
      <View style={styles.container}>
        <UpdateAvatar />
        <UpdateUserBasicInfo />
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

export default Profile;
