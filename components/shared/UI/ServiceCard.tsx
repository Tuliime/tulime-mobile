import { COLORS } from "@/constants";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

type ServiceCardProps = {
  icon: ImageSourcePropType;
  name: string;
  backgroundColor: string;
  link: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const navigateToScreen = (link: any) => {
    router.push(link);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToScreen(props.link)}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: props.backgroundColor },
        ]}
      >
        <Image source={props.icon} resizeMode="contain" style={styles.image} />
      </View>
      <Text style={styles.containerText}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray1,
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 32,
  },
  containerText: {
    color: COLORS.gray7,
    fontSize: 12,
    textAlign: "center",
  },
});
