import React, { ReactNode, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";

const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

type AppModalProp = {
  openModalElement: ReactNode;
  children: ReactNode;
  openModalElementStyles?: StyleProp<ViewStyle>;
  modalViewStyles?: StyleProp<ViewStyle>;
  modalChildrenStyles?: StyleProp<ViewStyle>;
  positionViewStyles?: StyleProp<ViewStyle>;
  modalAnimationType?: "none" | "slide" | "fade";
  showCloseModalIcon?: boolean;
  closeModal?: boolean;
};

export const AppModal: React.FC<AppModalProp> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showCloseModalIcon =
    props.showCloseModalIcon !== undefined ? props.showCloseModalIcon : true;

  const animationType = props.modalAnimationType
    ? props.modalAnimationType
    : "slide";

  useEffect(() => {
    const autoCloseModalHandler = () => {
      const closeModal = props.closeModal !== undefined && props.closeModal;

      if (!closeModal) return;
      setModalVisible(() => !closeModal);
    };
    autoCloseModalHandler();
  }, [props.closeModal]);

  return (
    <View style={styles.modalContainer}>
      {/* Open Modal */}
      <Pressable
        style={[styles.openModalElement, props.openModalElementStyles]}
        onPress={() => setModalVisible(() => true)}
      >
        {props.openModalElement}
      </Pressable>

      {modalVisible && (
        <SafeAreaProvider>
          <SafeAreaView
            style={[styles.safeAreaCenteredView, props.positionViewStyles]}
          >
            {/* Modal */}
            <Modal
              animationType={animationType}
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                console.log("Modal has been closed.");
                setModalVisible(() => !modalVisible);
              }}
            >
              <View style={[styles.centeredView, props.positionViewStyles]}>
                <View style={[styles.modalView, props.modalViewStyles]}>
                  {/* Modal Content */}
                  <View
                    style={[styles.modalChildren, props.modalChildrenStyles]}
                  >
                    {props.children}
                  </View>

                  {/* Close modal */}
                  {showCloseModalIcon && (
                    <Pressable
                      style={styles.closeModal}
                      onPress={() => setModalVisible(() => !modalVisible)}
                    >
                      <AntDesign name="close" size={24} color={COLORS.gray7} />
                    </Pressable>
                  )}
                </View>

                {/* Backdrop */}
                <Pressable
                  style={styles.backdrop}
                  onPress={() => setModalVisible(() => false)}
                />
              </View>
            </Modal>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openModalElement: {
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalView: {
    width: screenWidth * 0.96,
    backgroundColor: COLORS.white,
    minHeight: screenHeight * 0.2,
    height: "auto",
    maxHeight: screenHeight * 0.9,
    borderRadius: 20,
    position: "relative",
    zIndex: 1500,
  },
  modalChildren: {
    borderRadius: 20,
    width: "100%",
    height: "auto",
    padding: 16,
  },
  closeModal: {
    position: "absolute",
    top: 8,
    right: 8,
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
