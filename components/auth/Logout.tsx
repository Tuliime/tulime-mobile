import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { COLORS } from "@/constants";

export const Logout: React.FC = () => {
  const deleteAuth = useAuthStore((state) => state.deleteAuth);
  const clearAllUsers = useAuthStore((state) => state.clearAllUsers);

  const logoutHandler = () => {
    // maybe TODO: invalid user session
    deleteAuth();
    clearAllUsers();
    router.push("/auth/signin");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={logoutHandler}>
      <MaterialCommunityIcons name="logout" size={24} color={COLORS.gray8} />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    padding: 20,
  },
  logoutText: {
    color: COLORS.gray9,
    fontWeight: 500,
    fontSize: 16,
  },
});
