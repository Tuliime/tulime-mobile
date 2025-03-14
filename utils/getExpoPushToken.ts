import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

/**
 * Function to get the Expo push token
 * @returns Promise<string | null> - Expo push token or null if an error occurs
 */
export const getExpoPushToken = async (): Promise<string | null> => {
  try {
    // Check if notifications permissions are granted
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Push notifications need to be enabled."
        );
        return null;
      }
    }

    // Ensure the app is running on a physical device (not a simulator)
    if (!Device.isDevice) {
      Alert.alert("Error", "Push notifications only work on physical devices.");
      return null;
    }

    // Get the Expo push token
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", token);

    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
};
