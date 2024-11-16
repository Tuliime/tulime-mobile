import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, useRouter, router, Href } from "expo-router";
import { COLORS, SIZES } from "@/constants";

type MainSectionLayoutProp = {
  title: string;
  link: string;
  children: ReactNode;
};

export const MainSectionLayout: React.FC<MainSectionLayoutProp> = (props) => {
  const navigateToSection = () => {
    const link = props.link as Href<string | Object>;
    router.push(link);
  };

  return (
    <View style={{ width: "100%", height: "auto", gap: SIZES.medium }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.gray7,
            fontWeight: 600,
            fontSize: SIZES.medium,
          }}
        >
          {props.title}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: SIZES.xxSmall,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigateToSection()}
        >
          <Text style={{ color: COLORS.tertiary, fontWeight: 500 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View>{props.children}</View>
    </View>
  );
};
