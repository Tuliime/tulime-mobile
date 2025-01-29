import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MainLayout } from "@/components/shared/layout";
import { UpdateAvatar } from "@/components/settings/UpdateAvatar";
import { COLORS } from "@/constants";

const Settings: React.FC = () => {
  return (
    <MainLayout title="Settings">
      <View>
        <UpdateAvatar />
        {/* Basic Info form here */}
        {/* Change password */}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    padding: 12,
    alignItems: "center",
  },
  imageContainer: {
    width: "96%",
    // aspectRatio: "1/1",
    // borderRadius: "50%",
    // overflow: "hidden",
    // marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
