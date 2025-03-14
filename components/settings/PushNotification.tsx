import {
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TDevice } from "@/types/device";
import { device } from "@/API/device";
import { useDeviceStore } from "@/store/device";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { COLORS } from "@/constants";
import { getExpoPushToken } from "@/utils/getExpoPushToken";
import * as Device from "expo-device";
import Toast from "react-native-toast-message";

export const PushNotification: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);

  const allDevices = useDeviceStore((state) => state.devices);
  const currentDevice = useDeviceStore((state) => state.currentDevice);

  const updateAllDevices = useDeviceStore((state) => state.updateAllDevices);
  const updateCurrentDevice = useDeviceStore(
    (state) => state.updateCurrentDevice
  );

  const {
    isPending: enableDisableDeviceIsPending,
    mutate: enableDisableDeviceMutate,
  } = useMutation({
    mutationFn: isEnabled ? device.disable : device.enable,
    onSuccess: (response: any) => {
      updateCurrentDevice(response.data);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: response.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    },
    onError: (error) => {
      console.log("Error disabling/Enabling device token:", error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: error.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    },
  });

  const { isPending: postDeviceIsPending, mutate: postDeviceMutate } =
    useMutation({
      mutationFn: device.post,
      onSuccess: (response: any) => {
        updateCurrentDevice(response.data);
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: response.message,
          position: "top",
          visibilityTime: 5000,
          autoHide: true,
        });
      },
      onError: (error) => {
        console.log("Error disabling/Enabling device token:", error);
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: error.message,
          position: "top",
          visibilityTime: 5000,
          autoHide: true,
        });
      },
    });

  const {
    isPending: isFetchingDevices,
    isError: isFetchError,
    data,
    error: fetchError,
  } = useQuery({
    queryKey: [`devices-${userID}`],
    queryFn: () => {
      if (!accessToken) return {} as any;
      return device.getByUser({ userID: userID, token: accessToken });
    },
  });

  if (isFetchError) {
    console.log("fetchError:", fetchError);
  }

  const devices: TDevice["device"][] = data?.data ?? [];

  const hasDevices: boolean = isArrayWithElements(devices);

  useEffect(() => {
    if (!hasDevices) return;

    updateAllDevices(devices);
  }, [data, isFetchingDevices]);

  useEffect(() => {
    const updateNotificationStateHandler = () => {
      const hasCurrentDevice: boolean = !!allDevices.find(
        (device) => device.id === currentDevice.id
      );

      if (hasCurrentDevice) {
        setIsEnabled(() => !currentDevice.notificationDisabled);
        return;
      }
      setIsEnabled(() => hasCurrentDevice);
    };
    updateNotificationStateHandler();
  }, [allDevices, currentDevice]);

  const postDeviceHandler = async () => {
    if (!!currentDevice.token) return;
    const deviceToken = await getExpoPushToken()!;
    let deviceName: string = "";

    if (Device.deviceName) deviceName = Device.deviceName;
    if (!deviceToken || !deviceName) return;

    postDeviceMutate({
      userID: userID,
      deviceToken: deviceToken,
      name: deviceName,
      tokenType: "EXPO",
      accessToken: accessToken,
    });
  };

  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);

    const hasCurrentDevice: boolean = !!allDevices.find(
      (device) => device.id === currentDevice.id
    );
    if (hasCurrentDevice) {
      enableDisableDeviceMutate({
        deviceID: currentDevice.id,
        token: accessToken,
      });
      return;
    }

    postDeviceHandler();
  };

  //   console.log("allDevices: ", allDevices);
  //   console.log("currentDevice: ", currentDevice);
  //   console.log("isEnabled: ", isEnabled);

  const isLoading: boolean =
    postDeviceIsPending || enableDisableDeviceIsPending;

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Push Notifications</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isEnabled
            ? "You will receive notifications on this device"
            : "Notifications are turned off for this device"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#8ce99a" }}
          thumbColor={isEnabled ? "#37b24d" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={isLoading}
          style={styles.switch}
        />
        {isLoading && (
          <ActivityIndicator
            size={28}
            color={COLORS.blue7}
            style={styles.loader}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    position: "relative",
  },
  Heading: {
    fontSize: 20,
    color: COLORS.gray8,
    textAlign: "left",
  },
  switchContainer: {},
  switchText: {
    color: COLORS.gray6,
  },
  switch: {},
  loader: {
    position: "absolute",
    left: 0,
    bottom: 8,
  },
});
