import { useEffect, useState } from "react";
import { getExpoPushToken } from "@/utils/getExpoPushToken";
import { useDeviceStore } from "@/store/device";
import { useMutation } from "@tanstack/react-query";
import { device } from "@/API/device";
import { useAuthStore } from "@/store/auth";
import * as Device from "expo-device";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

export const useGetDeviceToken = () => {
  const currentDevice = useDeviceStore((state) => state.currentDevice);
  const updateCurrentDevice = useDeviceStore(
    (state) => state.updateCurrentDevice
  );
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  const { isPending, mutate } = useMutation({
    mutationFn: device.post,
    onSuccess: (response: any) => {
      console.log("device posted successfully:", response);
      updateCurrentDevice(response.data);
    },
    onError: (error) => {
      console.log("Error posting device token:", error);
    },
  });

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to receive notifications is required!");
    }
    console.log("Notification Permission status: ", status);
  };

  // TODO: TO revise this logic
  useEffect(() => {
    const postDeviceToken = async () => {
      try {
        console.log("inside post device start...");

        if (currentDevice.userID === userID) return;
        if (!accessToken || isExpiredAccessToken) return;
        console.log("inside post device get token start...");
        const deviceToken = await getExpoPushToken()!;
        console.log("inside post device get token end...");

        let deviceName: string = Device.deviceName! || "Unknown Device";

        if (!deviceToken) {
          Alert.alert("Device token needed", "No Device token is obtained!.");
          return;
        }

        console.log("inside post device Request start...");
        mutate({
          userID: userID,
          deviceToken: deviceToken,
          name: deviceName,
          tokenType: "EXPO",
          accessToken: accessToken,
        });
        console.log("inside post device Request end...");
        requestNotificationPermissions();
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: error.message,
          position: "top",
          visibilityTime: 5000,
          autoHide: true,
        });
      }
    };
    postDeviceToken();
  }, [currentDevice, accessToken]);
};
