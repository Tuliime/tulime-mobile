import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { store } from "@/API/store";
import { COLORS } from "@/constants";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { TEcommerceStore } from "@/types/ecommerceStore";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { truncateString } from "@/utils/truncateString";
import { AppModal } from "@/components/shared/UI/Modal";
import { PostFeedback } from "@/components/ecommerce/UI/PostFeedback";
const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

const StoreDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`store-${id}`],
    queryFn: () => {
      return store.getByStore({ storeID: id });
    },
  });

  const storeData: TEcommerceStore["store"] = data?.data ?? {};
  // const hasStoreData = !!storeData.id

  const hasBgImage = !!storeData.backgroundImageUrl;
  const hasLogo = !!storeData.logoUrl;
  const hasDescription = !!storeData.description;

  console.log("storeData: ", storeData);

  const navigateToMessenger = () => {
    router.push("/ecommerce/messenger");
  };

  if (isPending) {
    return (
      <MainLayout title={storeData.name}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title={storeData.name}>
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={storeData.name} childrenStyles={styles.layoutContainer}>
      <View style={styles.container}>
        {/* store bg */}

        <View style={styles.bgContainer}>
          {hasBgImage && (
            <Image
              source={{ uri: storeData.backgroundImageUrl }}
              style={[styles.image, { objectFit: "fill" }]}
            />
          )}
          {!hasBgImage && (
            <Image source={{ uri: images[0].uri }} style={styles.image} />
          )}
          <View style={styles.logoContainer}>
            {hasLogo && (
              <Image
                source={{ uri: storeData.logoUrl }}
                style={[styles.image, { objectFit: "contain" }]}
              />
            )}
            {!hasLogo && (
              <Ionicons name="business" size={28} color={COLORS.gray8} />
            )}
          </View>
        </View>

        {/* Store/Business Info */}
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeNameText}>{storeData.name}</Text>
          {hasDescription && (
            <Text style={styles.storeDescriptionText}>
              {truncateString(storeData.description, 176)}
            </Text>
          )}
          <View style={styles.storeLocationContainer}>
            <Entypo
              name="location-pin"
              size={24}
              color={COLORS.blue7}
              style={styles.locationIcon}
            />
            <Text style={styles.storeLocationText}>Kampala, Central</Text>
          </View>
          <View style={styles.storeActionContainer}>
            <AppModal
              openModalElement={
                <View
                  style={[
                    styles.actionsBtn,
                    {
                      backgroundColor: COLORS.gray3,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="feedback"
                    size={20}
                    color={COLORS.gray8}
                    style={styles.actionsIcon}
                  />
                  <Text style={[styles.actionsText, { color: COLORS.gray8 }]}>
                    Give Feedback
                  </Text>
                </View>
              }
            >
              <PostFeedback />
            </AppModal>
            <TouchableOpacity
              onPress={navigateToMessenger}
              style={[
                styles.actionsBtn,
                {
                  backgroundColor: COLORS.primary,
                  flex: 1,
                },
              ]}
            >
              <Ionicons
                name="chatbubble-ellipses-sharp"
                size={20}
                color={COLORS.white}
                style={styles.actionsIcon}
              />
              <Text style={styles.actionsText}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* store ads */}
        <View style={styles.adsContainer}></View>
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
  container: {},
  bgContainer: {
    backgroundColor: COLORS.gray5,
    width: screenWidth,
    height: screenHeight * 0.2,
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
  storeInfoContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 8,
  },
  storeNameText: {
    color: COLORS.gray8,
    fontWeight: 600,
    fontSize: 24,
  },
  storeDescriptionText: {
    color: COLORS.gray6,
  },
  storeLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },
  storeLocationText: {
    color: COLORS.gray6,
  },
  locationIcon: {
    marginLeft: -6,
  },
  storeActionContainer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  actionsBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: 8,
    borderRadius: 8,
    width: "auto",
  },
  actionsIcon: {},
  actionsText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 500,
  },
  adsContainer: {},
});

export default StoreDetailsScreen;

// TODO :  To be removed
const images = [
  {
    id: 1,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
  {
    id: 2,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
  {
    id: 3,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
  {
    id: 4,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
  {
    id: 5,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
];
