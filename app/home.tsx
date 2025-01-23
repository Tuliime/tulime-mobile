import React from "react";
import { HomeLayout } from "@/components/shared/layout";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants";

export default function Home() {
  return (
    <HomeLayout
      header={
        <View>
          <Text>Header Content here</Text>
        </View>
      }
    >
      <View>
        <Text>Home content here</Text>
        <Link style={{ alignItems: "center" }} href="/auth/signup">
          <Text style={{ fontSize: 12, color: COLORS.gray8 }}>sign up</Text>
        </Link>
        <Link style={{ alignItems: "center" }} href="/auth/signin">
          <Text style={{ fontSize: 12, color: COLORS.gray8 }}>sign In</Text>
        </Link>
        <Link style={{ alignItems: "center" }} href="/auth/forgotPassword">
          <Text style={{ fontSize: 12, color: COLORS.gray8 }}>
            Forgot Password
          </Text>
        </Link>
      </View>
    </HomeLayout>
  );
}
