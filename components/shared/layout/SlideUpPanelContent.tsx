import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { icons, SIZES, COLORS } from "@/constants";
import { router } from "expo-router";
import { useSlideUpPanelStore } from "@/store/slideUpPanel";
import { Logout } from "@/components/auth/UI/Logout";
import { AuthenticatedUser } from "@/components/auth/UI/AuthenticatedUser";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthStore } from "@/store/auth";
import Entypo from "@expo/vector-icons/Entypo";

export const SlideUpPanelContent: React.FC = () => {
  const closePanel = useSlideUpPanelStore((state) => state.closePanel);
  const user = useAuthStore((state) => state.auth.user);

  const navigateToScreen = (link: string) => {
    closePanel();
    const currenLink = link as any;
    router.push(currenLink);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={[styles.contentView, { padding: 20 }]}>
        <Text style={styles.logoText}>Tulime</Text>
      </View>
      {/* Current user */}
      <View style={[styles.contentView, { borderBottomWidth: 0 }]}>
        <AuthenticatedUser />
      </View>

      {/* Inbox */}
      <View style={[styles.contentView, { borderBottomWidth: 0 }]}>
        <TouchableOpacity
          style={[styles.contentBtnPrimary, { gap: 12 }]}
          onPress={() => navigateToScreen("/ecommerce/messenger")}
        >
          <Ionicons name="chatbox" size={24} color={COLORS.gray8} />
          <Text style={styles.contentTextPrimary}>Inbox</Text>
        </TouchableOpacity>
      </View>

      {/* Advert */}
      <View style={[styles.contentView, { borderBottomWidth: 0, gap: 8 }]}>
        <TouchableOpacity
          style={[styles.contentBtnPrimary, { marginLeft: -4 }]}
          onPress={() => navigateToScreen("/ecommerce")}
        >
          <MaterialIcons
            name="workspace-premium"
            size={24}
            color={COLORS.gray7}
          />
          <Text style={styles.contentTextPrimary}>Advert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBtnSecondary}
          onPress={() =>
            navigateToScreen(`/ecommerce/store/unknown?userID=${user.id}`)
          }
        >
          <Text style={styles.contentTextSecondary}>My adverts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBtnSecondary}
          onPress={() => navigateToScreen("/ecommerce")}
        >
          <Text style={styles.contentTextSecondary}>All adverts</Text>
        </TouchableOpacity>
      </View>

      {/* Services */}
      <View style={[styles.contentView, { borderBottomWidth: 0, gap: 8 }]}>
        <TouchableOpacity style={[styles.contentBtnPrimary]}>
          <MaterialIcons name="view-module" size={24} color={COLORS.gray7} />
          <Text style={styles.contentTextPrimary}>Services</Text>
        </TouchableOpacity>
        {services.map((srv, index) => (
          <TouchableOpacity
            style={styles.contentBtnSecondary}
            onPress={() => navigateToScreen(srv.link)}
            key={index}
          >
            <Text style={styles.contentTextSecondary}>{srv.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications */}
      <View style={[styles.contentView, { borderBottomWidth: 0, gap: 8 }]}>
        <TouchableOpacity
          style={[styles.contentBtnPrimary, { marginLeft: 0 }]}
          onPress={() => navigateToScreen("/notification")}
        >
          <MaterialIcons name="notifications" size={24} color={COLORS.gray7} />
          <Text style={styles.contentTextPrimary}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Bookmark */}
      <View style={[styles.contentView, { borderBottomWidth: 0, gap: 8 }]}>
        <TouchableOpacity
          style={[styles.contentBtnPrimary]}
          onPress={() => navigateToScreen("/ecommerce/bookmark")}
        >
          <Ionicons name="bookmark" size={22} color={COLORS.gray7} />
          <Text style={styles.contentTextPrimary}>Bookmarks</Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={[styles.contentView, { borderBottomWidth: 0, gap: 8 }]}>
        <TouchableOpacity
          style={[styles.contentBtnPrimary]}
          onPress={() => navigateToScreen("/settings")}
        >
          <Ionicons name="settings-sharp" size={24} color={COLORS.gray7} />
          <Text style={styles.contentTextPrimary}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <Logout />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  logoText: {
    fontSize: SIZES.xLarge,
    fontWeight: "600",
    color: COLORS.primary,
  },
  contentView: {
    borderBottomWidth: 1,
    borderColor: "#adb5bd",
    paddingHorizontal: 20,
    gap: 12,
  },
  contentBtnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contentTextPrimary: {
    fontWeight: 500,
    fontSize: 18,
    color: COLORS.gray8,
  },
  contentBtnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 28,
  },
  contentTextSecondary: {
    color: COLORS.gray7,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderColor: "#adb5bd",
  },
});
const services = [
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
