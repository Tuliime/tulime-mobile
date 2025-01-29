import { icons, COLORS } from "@/constants";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuthStore } from "@/store/auth";

const screenWidth = Dimensions.get("window").width * 0.98;
const avatarWidth = screenWidth * 0.4;

export const UpdateAvatar = () => {
  const user = useAuthStore((state) => state.auth.user);
  const hasAvatar: boolean = !!user.imageUrl;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.imageContainer}>
        {hasAvatar && (
          <Image
            source={{ uri: `${user.imageUrl}` }}
            resizeMode="cover"
            style={styles.image}
          />
        )}
        {!hasAvatar && (
          <Image
            source={icons.profileLarge}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </View>
      <TouchableOpacity style={styles.editContainer}>
        <Feather name="edit-2" size={16} color={COLORS.gray8} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    color: COLORS.gray8,
  },
  imageContainer: {
    width: avatarWidth,
    aspectRatio: "1/1",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  editContainer: {
    backgroundColor: COLORS.gray4,
    padding: 12,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
