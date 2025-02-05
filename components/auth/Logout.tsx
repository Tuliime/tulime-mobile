import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { COLORS } from "@/constants";

export const Logout: React.FC = () => {
  const deleteAuth = useAuthStore((state) => state.deleteAuth);

  const logoutHandler = () => {
    // maybe TODO: invalid user session
    deleteAuth();
    router.push("/auth/signin");
  };
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 4 }}
      onPress={logoutHandler}
    >
      <MaterialCommunityIcons name="logout" size={24} color={COLORS.white} />
      {/* <Text>Log out</Text> */}
    </TouchableOpacity>
  );
};
