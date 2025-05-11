import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/constants";
import { useLogout } from "@/hooks/useLogout";

export const Logout: React.FC = () => {
  const { logout } = useLogout();
  const logoutHandler = () => logout();

  // TODO: To show logout in the modal
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
