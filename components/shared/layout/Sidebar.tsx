import React, { useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SidebarContent } from "./SidebarContent";
import { useSidebarStore } from "@/store/sidebar";

const screenWidth = Dimensions.get("window").width;
const sidebarWidth = screenWidth * 0.8;

export const Sidebar: React.FC = () => {
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const isOpenSidebar = useSidebarStore((state) => state.isOpen);

  const translateX = useRef(new Animated.Value(-sidebarWidth)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, []);

  const handleCloseSidebar = () => {
    Animated.spring(translateX, {
      toValue: -sidebarWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
    setTimeout(() => {
      closeSidebar();
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <SidebarContent />
      </Animated.View>

      {/* Backdrop */}
      {isOpenSidebar && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleCloseSidebar}
          activeOpacity={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  sidebar: {
    ...StyleSheet.absoluteFillObject,
    width: sidebarWidth,
    height: "100%",
    backgroundColor: "#e9ecef",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 50,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
