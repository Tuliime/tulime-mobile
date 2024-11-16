import { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Stack } from "expo-router";
import { COLORS, SIZES, icons } from "@/constants";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const openSideBar = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f3f5" }}>
      {/* TODO: put sidebar here */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#f8f9fa", //green-9 #ebfbee
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.small / 1.25,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.small / 1.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={openSideBar}
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
              <Text style={{ fontSize: SIZES.xLarge, fontWeight: "600" }}>
                Tulime
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.small / 1.25,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.small / 1.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={openSideBar}
              >
                <Image
                  source={icons.notification}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.small / 1.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={openSideBar}
              >
                <Image
                  source={icons.internet}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.small / 1.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={openSideBar}
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
        <View style={{ flex: 1, padding: SIZES.medium }}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
