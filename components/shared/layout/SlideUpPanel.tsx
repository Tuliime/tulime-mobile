import React, { useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSlideUpPanelStore } from "@/store/slideUpPanel";
import { SlideUpPanelContent } from "./SlideUpPanelContent";
import { COLORS } from "@/constants";

const screenHeight = Dimensions.get("window").height;
const panelHeight = screenHeight * 0.8;

export const SlideUpPanel: React.FC = () => {
  const closePanel = useSlideUpPanelStore((state) => state.closePanel);
  const isOpenPanel = useSlideUpPanelStore((state) => state.isOpen);

  const translateY = useRef(new Animated.Value(panelHeight)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, []);

  const handleClosePanel = () => {
    Animated.spring(translateY, {
      toValue: panelHeight,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
    setTimeout(() => {
      closePanel();
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Panel */}
      <Animated.View style={[styles.panel, { transform: [{ translateY }] }]}>
        <SlideUpPanelContent />
      </Animated.View>

      {/* Backdrop */}
      {isOpenPanel && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleClosePanel}
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
    position: "absolute",
  },
  panel: {
    width: "100%",
    height: panelHeight,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    zIndex: 1300,
  },
});
