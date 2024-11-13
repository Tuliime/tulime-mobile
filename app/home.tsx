import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, icons, SIZES } from "@/constants";

export default function Home() {
  const openSideBar = () => {};

  return (
    <MainLayout
      headerLeft={
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
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: SIZES.xLarge, fontWeight: 600 }}>
            Tulime
          </Text>
        </View>
      }
      headerRight={
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
      }
    >
      <Text>home Screen content here</Text>
    </MainLayout>
  );
}

// const styles = StyleSheet.create({
//   btnContainer: {
//     width: 40,
//     height: 40,
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.small / 1.25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnImg: (dimension) => ({
//     width: dimension,
//     height: dimension,
//     borderRadius: SIZES.small / 1.25,
//   }),
// });
