import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { COLORS } from "@/constants";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
// import { AppModal } from "@/components/shared/UI/Modal";
import { UpdateStore } from "@/components/ecommerce/store/UI/UpdateStore";
import { useEcommerceStore } from "@/store/ecommerceStore";
const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

const EditStore = () => {
  const currentStore = useEcommerceStore((state) => state.currentStore);
  const hasLogo = !!currentStore.logoUrl;

  return (
    <MainLayout title="Edit Store" childrenStyles={styles.layoutContainer}>
      <View style={styles.container}>
        {/* store bg */}
        <View style={styles.bgContainer}>
          <Image
            source={{ uri: currentStore.backgroundImageUrl }}
            style={[styles.image, { objectFit: "fill" }]}
          />
          <View style={styles.logoContainer}>
            {hasLogo && (
              <Image
                source={{ uri: currentStore.logoUrl }}
                style={[styles.image, { objectFit: "contain" }]}
              />
            )}
            {!hasLogo && (
              <Ionicons name="business" size={28} color={COLORS.gray8} />
            )}
          </View>

          {/* Update store form */}
          <View style={styles.updateFormContainer}>
            <UpdateStore store={currentStore} />
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContentText: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.gray7,
  },
  layoutContainer: {
    padding: 0,
  },
  container: {
    flex: 1,
    // backgroundColor: "lightpink",
  },
  bgContainer: {
    backgroundColor: COLORS.gray5,
    width: screenWidth,
    height: screenHeight * 0.2,
    minHeight: screenHeight * 0.2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.gray2,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.white,
    elevation: 5,
    position: "absolute",
    bottom: -24,
    left: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  updateFormContainer: {
    // flex: 1,
    marginTop: 48,
    paddingHorizontal: 16,
  },
});

export default EditStore;
