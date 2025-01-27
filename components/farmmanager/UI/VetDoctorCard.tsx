import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { TVetDoctor } from "@/types/vetDoctor";

type VetDoctorCardProps = TVetDoctor["vetdoctor"] & {
  itemWidth: number;
};

export const VetDoctorCard: React.FC<VetDoctorCardProps> = (props) => {
  const user = useAuthStore((state) => state.auth.user);

  const gender =
    props.gender.charAt(0).toUpperCase() + props.gender.slice(1).toLowerCase();

  return (
    <View style={[styles.card, { width: props.itemWidth }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${user.imageUrl}` }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.badgesContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Verified</Text>
        </View>
        <Text style={styles.genderText}>{gender}</Text>
      </View>
      <Text style={styles.nameText}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    padding: 12,
    alignItems: "center",
  },
  imageContainer: {
    width: "96%",
    aspectRatio: 1,
    borderRadius: 9999,
    overflow: "hidden",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  genderText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  nameText: {
    color: COLORS.gray8,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
});
