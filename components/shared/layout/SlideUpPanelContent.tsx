import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { icons, SIZES, COLORS } from "@/constants";
import { router } from "expo-router";
import { useSlideUpPanelStore } from "@/store/slideUpPanel";
import { Logout } from "@/components/auth/Logout";

export const SlideUpPanelContent: React.FC = () => {
  const closePanel = useSlideUpPanelStore((state) => state.closePanel);

  const navigateToScreen = (link: string) => {
    const currenLink = link as any;
    router.push(currenLink);
    closePanel();
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.contentView}>
        <Text style={styles.logoText}>Tulime</Text>
      </View>
      {/* Content */}
      <View style={styles.contentView}>
        {sidebarContentList.map((item, index) => (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            key={index}
            onPress={(_) => navigateToScreen(item.link)}
          >
            <Image source={item.icon} resizeMode="cover" style={styles.icon} />
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Others like settings */}
      <View style={styles.contentView}>
        {otherContentList.map((item, index) => (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            key={index}
            onPress={(_) => navigateToScreen(item.link)}
          >
            <Image source={item.icon} resizeMode="cover" style={styles.icon} />
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Logout */}
      <View>
        <Logout />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentView: {
    borderBottomWidth: 1,
    borderColor: "#adb5bd",
    padding: 20,
    gap: 20,
  },
  logoText: {
    fontSize: SIZES.xLarge,
    fontWeight: "600",
    color: COLORS.primary,
  },
  button: {
    flexDirection: "row",
    gap: SIZES.large,
  },
  icon: {
    width: 28,
    height: 28,
  },
  buttonText: {
    color: COLORS.gray8,
    fontSize: SIZES.medium,
    fontWeight: 500,
  },
});

const sidebarContentList = [
  {
    name: "Agro Products",
    link: "/agroproducts",
    icon: icons.maize,
    Children: [],
  },
  {
    name: "Farm Inputs",
    link: "/farminputs",
    icon: icons.spray,
    Children: [],
  },
  {
    name: "Farm managers",
    link: "/farmmanagers",
    icon: icons.farmManager,
    Children: [],
  },
  {
    name: "Veterinary Doctors",
    link: "/veterinarydoctors",
    icon: icons.vet,
    Children: [],
  },
  {
    name: "News",
    link: "/news",
    icon: icons.news3,
    Children: [],
  },
  {
    name: "Institutions",
    link: "/institutions",
    icon: icons.institution,
    Children: [],
  },
];

const otherContentList = [
  {
    name: "Settings",
    link: "/settings",
    icon: icons.settings3,
    Children: [],
  },
  {
    name: "Feedback",
    link: "/feedback",
    icon: icons.feedback3,
    Children: [],
  },
];
