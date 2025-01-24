import React from "react";
import { HomeLayout } from "@/components/shared/layout";
import { View, Text } from "react-native";
import { Link, router } from "expo-router";
import { COLORS } from "@/constants";

export default function Home() {
  // router.push(`/auth/resetPassword?otp=${otp}`)
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
        <Link style={{ alignItems: "center" }} href="/auth/resetPassword">
          <Text style={{ fontSize: 12, color: COLORS.gray8 }}>
            Reset Password
          </Text>
        </Link>
        <Link style={{ alignItems: "center" }} href="/auth/verifyOTP">
          <Text style={{ fontSize: 12, color: COLORS.gray8 }}>Verify OTP </Text>
        </Link>
      </View>
    </HomeLayout>
  );
}
