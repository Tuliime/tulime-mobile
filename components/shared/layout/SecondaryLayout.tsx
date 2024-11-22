import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { Stack, router } from "expo-router";
import { COLORS, SIZES, icons } from "@/constants";
type SecondaryLayoutProps = {
  children: ReactNode;
  title: string;
};
const headerWidth = Dimensions.get("window").width * 0.9;

export const SecondaryLayout: React.FC<SecondaryLayoutProps> = (props) => {
  const navigateToBack = () => router.back();

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
          headerShown: true,
          headerShadowVisible: true,
          headerLeft: () => (
            <View
              style={{
                width: headerWidth,
                backgroundColor: "#f1f3f5",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: -8,
                padding: 8,
                paddingHorizontal: -28,
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
                onPress={(_) => navigateToBack()}
              >
                <Image
                  source={icons.arrowLeft}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: -20,
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
              >
                <Text style={{ fontSize: SIZES.medium, fontWeight: 500 }}>
                  {props.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: SIZES.small / 1.25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={(_) => {}}
              >
                <Image
                  source={icons.search}
                  resizeMode="cover"
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: -20,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
