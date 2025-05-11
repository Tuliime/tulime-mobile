import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/auth";
import { ProfileAvatar } from "@/components/shared/UI/ProfileAvatar";
import { COLORS } from "@/constants";
import { router } from "expo-router";

export const AuthenticatedUser = () => {
  const user = useAuthStore((state) => state.auth.user);

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToProfile}>
      <View style={styles.nameContainer}>
        <ProfileAvatar user={user} width={32} height={32} fontWeight={500} />
        <Text style={styles.nameText}>{user.name}</Text>
      </View>
      <View>
        <Text style={styles.telNumberText}>+{user.telNumber}</Text>
        {/* <Text>{user.email}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //  width: "100%",
    gap: 4,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameText: {
    color: COLORS.gray8,
    fontWeight: 400,
    fontSize: 18,
  },
  telNumberText: {
    fontSize: 14,
  },
});
