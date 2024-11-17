import React, { useEffect, useRef } from "react";
import { View, Text, Dimensions, Animated, StyleSheet } from "react-native";

const sidebarWidth = Dimensions.get("window").width * 0.8;
const sidebarHeight = Dimensions.get("window").height;

export const Sidebar: React.FC = () => {
  console.log("Inside Sidebar function");

  const translateX = useRef(new Animated.Value(-sidebarWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
      <Text style={styles.text}>Sidebar</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: sidebarWidth,
    height: sidebarHeight,
    backgroundColor: "#f5f5f5",
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
  },
});
