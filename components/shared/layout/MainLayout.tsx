import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Href, Stack, router } from "expo-router";
import { COLORS, SIZES, icons } from "@/constants";
import { Sidebar } from "@/components/shared/layout";
import { useSidebarStore } from "@/store";

type MainLayoutProps = {
  children: ReactNode;
};
const headerWidth = Dimensions.get("window").width * 0.9;

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const openSideBar = useSidebarStore((state) => state.openSidebar);
  const isOpenSidebar = useSidebarStore((state) => state.isOpen);

  console.log("isOpenSidebar: ", isOpenSidebar);

  const navigateToSearch = () => router.push("/search");

  const HEADER_HEIGHT = Platform.OS === "android" ? 56 : 44;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f3f5", position: "relative" }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f1f3f5"
        translucent={false}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#f8f9fa",
          },
          headerShown: isOpenSidebar ? false : true,
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                width: headerWidth,
                backgroundColor: COLORS.gray3,
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: SIZES.small / 1.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={(_) => openSideBar()}
              >
                <Image
                  source={icons.menu}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "auto",
                  borderRadius: SIZES.small / 1.25,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={(_) => navigateToSearch()}
              >
                <Text>Search Tulime</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: SIZES.small / 1.25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={(_) => navigateToSearch()}
              >
                <Image
                  source={icons.search}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isOpenSidebar && <Sidebar />}
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            marginTop: isOpenSidebar ? HEADER_HEIGHT : 0,
          }}
        >
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
