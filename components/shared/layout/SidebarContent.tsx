import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons, SIZES, COLORS } from "@/constants";

export const SidebarContent: React.FC = () => {
  return (
    <View style={{ marginTop: 28 }}>
      {/* Logo */}
      <View
        style={{ borderBottomWidth: 1, borderColor: "#adb5bd", padding: 20 }}
      >
        <Text
          style={{
            fontSize: SIZES.xLarge,
            fontWeight: "600",
            color: COLORS.primary,
          }}
        >
          Tulime
        </Text>
      </View>
      {/* Content */}
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#adb5bd",
          padding: 20,
          gap: SIZES.xLarge,
        }}
      >
        {sidebarContentList.map((item) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: SIZES.large,
            }}
            activeOpacity={1}
          >
            <Image
              source={item.icon}
              resizeMode="cover"
              style={{
                width: 28,
                height: 28,
              }}
            />
            <Text
              style={{
                color: COLORS.gray8,
                fontSize: SIZES.medium,
                fontWeight: 500,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Others like settings */}
      <View
        style={{
          padding: 20,
          gap: SIZES.xLarge,
        }}
      >
        {otherContentList.map((item) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: SIZES.large,
            }}
            activeOpacity={1}
          >
            <Image
              source={item.icon}
              resizeMode="cover"
              style={{
                width: 28,
                height: 28,
              }}
            />
            <Text
              style={{
                color: COLORS.gray8,
                fontSize: SIZES.medium,
                fontWeight: 500,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const sidebarContentList = [
  {
    name: "Agro Products",
    link: "#",
    icon: icons.maize,
    Children: [],
  },
  {
    name: "Farm Inputs",
    link: "#",
    icon: icons.spray,
    Children: [],
  },
  {
    name: "Farm managers",
    link: "#",
    icon: icons.farmManager,
    Children: [],
  },
  {
    name: "Veterinary Doctors",
    link: "#",
    icon: icons.vet,
    Children: [],
  },
  {
    name: "News",
    link: "#",
    icon: icons.news3,
    Children: [],
  },
  {
    name: "Institutions",
    link: "#",
    icon: icons.institution,
    Children: [],
  },
];

const otherContentList = [
  {
    name: "Settings",
    link: "#",
    icon: icons.settings3,
    Children: [],
  },
  {
    name: "Feedback",
    link: "#",
    icon: icons.feedback3,
    Children: [],
  },
];
