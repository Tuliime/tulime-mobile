import { COLORS, SIZES } from "@/constants";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSlideUpPanelStore } from "@/store/slideUpPanel";
import { Ionicons } from "@expo/vector-icons";
import { NotificationCount } from "@/components/notification/NotificationCount";
import { SlideUpPanel } from "./SlideUpPanel";
import { ProfileAvatar } from "../UI/ProfileAvatar";
import { useAuthStore } from "@/store/auth";

const headerWidth = Dimensions.get("window").width * 0.999;

type PrimaryHeaderProps = {};

// TODO: To highlight active ones
export const PrimaryHeader: React.FC<PrimaryHeaderProps> = (props) => {
  const user = useAuthStore((state) => state.auth.user);
  const isOpenSlideUpPanel = useSlideUpPanelStore((state) => state.isOpen);

  const navigateToSearch = () => router.push("/search");
  const navigateToBookmark = () => router.push("/ecommerce/bookmark");

  return (
    <Stack.Screen
      options={{
        headerStyle: styles.headerStyle,
        headerShown: isOpenSlideUpPanel ? false : true,
        headerShadowVisible: true,
        headerLeft: () => (
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>Tulime</Text>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => navigateToBookmark()}>
                  <Ionicons
                    name="bookmark-outline"
                    size={22}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <NotificationCount />
                <SlideUpPanel
                  openSlideUpPanelElement={
                    <ProfileAvatar
                      user={user}
                      width={36}
                      height={36}
                      fontWeight={500}
                    />
                  }
                />
              </View>
            </View>
          </View>
        ),
        headerTitle: "",
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: headerWidth,
    gap: 8,
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 24,
    color: COLORS.white,
  },
  headerSearchContainer: {
    width: "100%",
  },
  headerSearch: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerSearchText: {
    color: COLORS.gray6,
  },
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerLeftContainer: {
    width: headerWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "auto",
    borderRadius: SIZES.small / 1.25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    color: COLORS.white,
  },
});
