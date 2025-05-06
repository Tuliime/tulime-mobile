import { useState, useEffect } from "react";
import * as Network from "expo-network";

export const CONNECTION_STATUS = {
  ONLINE: "online",
  CONNECTING: "connecting",
  OFFLINE: "offline",
};

export const useNetworkStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState(
    CONNECTION_STATUS.CONNECTING
  );
  const [checkInterval, setCheckInterval] = useState<any>(null);

  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();

      if (networkState.isConnected && networkState.isInternetReachable) {
        setConnectionStatus(CONNECTION_STATUS.ONLINE);
      } else if (
        networkState.isConnected &&
        networkState.isInternetReachable === null
      ) {
        setConnectionStatus(CONNECTION_STATUS.CONNECTING);
      } else {
        setConnectionStatus(CONNECTION_STATUS.OFFLINE);
      }
    } catch (error) {
      console.error("Error checking network status:", error);
      setConnectionStatus(CONNECTION_STATUS.OFFLINE);
    }
  };

  useEffect(() => {
    // Initial check
    checkNetworkStatus();

    // Set up interval for continuous checking
    const interval = setInterval(checkNetworkStatus, 3000);
    setCheckInterval(interval);

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = () => {
      checkNetworkStatus();
    };

    handleAppStateChange();

    return () => {};
  }, []);

  return connectionStatus;
};
