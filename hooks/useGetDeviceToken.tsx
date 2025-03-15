import { useEffect, useState } from "react";
import { getExpoPushToken } from "@/utils/getExpoPushToken";
import { useDeviceStore } from "@/store/device";
import { useMutation } from "@tanstack/react-query";
import { device } from "@/API/device";
import { useAuthStore } from "@/store/auth";
import * as Device from "expo-device";

export const useGetDeviceToken = () => {
  const currentDevice = useDeviceStore((state) => state.currentDevice);
  const updateCurrentDevice = useDeviceStore(
    (state) => state.updateCurrentDevice
  );
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const [deviceName, setDeviceName] = useState("");

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

  useEffect(() => {
    const postDeviceToken = async () => {
      console.log("inside post device start...");
      if (currentDevice.token) return;
      if (!accessToken) return;
      console.log("inside post device get token start...");
      const deviceToken = await getExpoPushToken()!;
      console.log("inside post device get token end...");

      if (Device.deviceName) setDeviceName(() => Device.deviceName!);

      // if (!deviceToken || !deviceName) return;
      if (!deviceToken) return;

      // name: Device.modelName || "Unknown Device",
      console.log("inside post device Request start...");
      mutate({
        userID: userID,
        deviceToken: deviceToken,
        // name: deviceName,
        name: Device.modelName || "Unknown Device",
        tokenType: "EXPO",
        accessToken: accessToken,
      });
      console.log("inside post device Request end...");
    };
    postDeviceToken();
  }, [currentDevice, deviceName]);
};
