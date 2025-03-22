import React, { ReactNode, useState } from "react";
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
};

export const AppModal: React.FC<AppModalProp> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaCenteredView}>
        {/* Open Modal */}
        <Pressable
          style={[styles.openModalElement, props.openModalElementStyles]}
          onPress={() => setModalVisible(() => true)}
        >
          {props.openModalElement}
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
            <View style={styles.modalView}>
              {/* Modal Content */}
              <View style={styles.modalChildren}>{props.children}</View>

              {/* Close modal */}
              <Pressable
                style={styles.closeModal}
                onPress={() => setModalVisible(() => !modalVisible)}
              >
                <AntDesign name="close" size={24} color={COLORS.gray7} />
              </Pressable>
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
  );
};

const styles = StyleSheet.create({
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
