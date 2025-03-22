import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSlideUpPanelStore } from "@/store/slideUpPanel";
import { SlideUpPanelContent } from "./SlideUpPanelContent";
import { COLORS } from "@/constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

type SlideUpPanelProp = {
  openSlideUpElement: ReactNode;
  openSlideUpElementStyles?: StyleProp<ViewStyle>;
};

export const SlideUpPanel: React.FC<SlideUpPanelProp> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeAreaCenteredView}>
          {/* Open Modal */}
          <Pressable
            style={[styles.openSlideUpElement, props.openSlideUpElementStyles]}
            onPress={() => setModalVisible(() => true)}
          >
            {props.openSlideUpElement}
          </Pressable>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(() => !modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              {/* Content */}
              {modalVisible && (
                <View style={styles.contentView}>
                  <SlideUpPanelContent />
                </View>
              )}

              {/* Backdrop */}
              <Pressable
                style={styles.backdrop}
                onPress={() => setModalVisible(() => false)}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openSlideUpElement: {
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentView: {
    width: screenWidth,
    backgroundColor: COLORS.white,
    minHeight: screenHeight * 0.2,
    height: "auto",
    maxHeight: screenHeight * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1500,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
