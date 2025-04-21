import React, { useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { store } from "@/API/store";
import { COLORS, SIZES } from "@/constants";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { TEcommerceStore } from "@/types/ecommerceStore";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { truncateString } from "@/utils/truncateString";
// import { AppModal } from "@/components/shared/UI/Modal";
// import { PostFeedback } from "@/components/ecommerce/UI/PostFeedback";
import { AdProductCard } from "@/components/ecommerce/UI/AdProductCard";
import { TEcommerce } from "@/types/ecommerce";
import { useAuthStore } from "@/store/auth";
import { TAdvert } from "@/types/advert";
import { useEcommerceStore } from "@/store/ecommerceStore";
const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const StoreDetailsScreen = () => {
  const user = useAuthStore((state) => state.auth.user);
  const { storeID } = useLocalSearchParams<{ storeID: string }>();
  const updateCurrentStore = useEcommerceStore(
    (state) => state.updateCurrentStore
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`store-${storeID}`],
    queryFn: () => {
      return store.get({ storeID: storeID });
    },
  });

  const storeData: TEcommerceStore["store"] = data?.data ?? {};
  const storeAdverts = storeData.adverts!;

  const isCurrentUser = storeData.userID === user.id;
  const hasBgImage = !!storeData.backgroundImageUrl;
  const hasLogo = !!storeData.logoUrl;
  const hasDescription = !!storeData.description;

  // TODO: To implement navigation to direct to the inbox
  const navigateToMessenger = () => {
    router.push("/ecommerce/messenger");
  };

  const navigateToStoreEdit = () => {
    updateCurrentStore(storeData);
    router.push(`/ecommerce/store/${storeID}/edit`);
  };

  const navigateToFeedback = () => {
    router.push(`/ecommerce/store/${storeID}/feedback`);
  };

  const renderAdItems = useCallback(({ item }: { item: TAdvert["advert"] }) => {
    return (
      <View style={{ width: itemWidth - 2, marginHorizontal: 2 }}>
        <AdProductCard
          name={""}
          imageUrl={""}
          description={""}
          price={""}
          priceCurrency={""}
          advert={item}
        />
      </View>
    );
  }, []);

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
          <View style={styles.storeNameContainer}>
            <Text style={styles.storeNameText}>{storeData.name}</Text>
            {isCurrentUser && (
              <TouchableOpacity
                style={styles.editContainer}
                onPress={navigateToStoreEdit}
              >
                <Feather
                  name="edit"
                  size={20}
                  color={COLORS.primary}
                  style={styles.editIcon}
                />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
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
            <TouchableOpacity
              onPress={navigateToFeedback}
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
              {isCurrentUser ? (
                <Text style={[styles.actionsText, { color: COLORS.gray8 }]}>
                  Received Feedback
                </Text>
              ) : (
                <Text style={[styles.actionsText, { color: COLORS.gray8 }]}>
                  Give Feedback
                </Text>
              )}
            </TouchableOpacity>
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
              {isCurrentUser ? (
                <FontAwesome
                  name="inbox"
                  size={20}
                  color={COLORS.white}
                  style={styles.actionsIcon}
                />
              ) : (
                <Ionicons
                  name="chatbubble-ellipses-sharp"
                  size={20}
                  color={COLORS.white}
                  style={styles.actionsIcon}
                />
              )}
              {isCurrentUser ? (
                <Text style={styles.actionsText}>My Inbox</Text>
              ) : (
                <Text style={styles.actionsText}>Start Chat</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* store ads */}
        <View style={styles.adsContainer}>
          <View style={styles.adsTitleContainer}>
            <MaterialIcons
              name="workspace-premium"
              size={24}
              color={COLORS.gray7}
            />
            <Text style={styles.adsTitle}>
              All ads from {isCurrentUser ? "You" : storeData.name}
            </Text>
          </View>
          <FlatList
            data={storeAdverts}
            keyExtractor={(item) => item.id}
            renderItem={renderAdItems}
            scrollEnabled={false}
            numColumns={numColumns}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          />
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
  storeNameContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  storeNameText: {
    color: COLORS.gray8,
    fontWeight: 600,
    fontSize: 24,
  },
  storeDescriptionText: {
    color: COLORS.gray6,
  },
  editContainer: {
    flexDirection: "row",
    gap: 4,
  },
  editIcon: {},
  editText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 500,
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
    gap: 8,
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
  adsContainer: {
    marginTop: 24,
    gap: 16,
    paddingHorizontal: 16,
  },
  adsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.gray7,
  },
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

const ads = [
  {
    name: "Maize Seeds",
    description: "High-yield hybrid maize seeds for planting.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "25000",
    priceCurrency: "UGX",
  },
  {
    name: "Organic Fertilizer",
    description: "Natural compost-based fertilizer for healthy crops.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "40000",
    priceCurrency: "UGX",
  },
  {
    name: "Pesticide Spray",
    description: "Effective pesticide spray for controlling pests.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "30000",
    priceCurrency: "UGX",
  },
  {
    name: "Watering Can",
    description: "10L watering can for easy irrigation.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "15000",
    priceCurrency: "UGX",
  },
  {
    name: "Hoe",
    description: "Durable steel hoe for tilling land.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "25000",
    priceCurrency: "UGX",
  },
  {
    name: "Tractor",
    description: "Heavy-duty tractor for large-scale farming.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "50000000",
    priceCurrency: "UGX",
  },
  {
    name: "Irrigation Pipes",
    description: "Flexible irrigation pipes for water distribution.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "60000",
    priceCurrency: "UGX",
  },
  {
    name: "Cattle Feed",
    description: "Nutritious feed for cattle growth.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "70000",
    priceCurrency: "UGX",
  },
  {
    name: "Poultry Feeder",
    description: "Automatic poultry feeder for easy feeding.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "30000",
    priceCurrency: "UGX",
  },
  {
    name: "Insect Netting",
    description: "Protects crops from harmful insects.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "45000",
    priceCurrency: "UGX",
  },
  {
    name: "Farm Boots",
    description: "Durable rubber boots for farm work.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "35000",
    priceCurrency: "UGX",
  },
  {
    name: "Sprayer Pump",
    description: "15L sprayer pump for applying chemicals.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "55000",
    priceCurrency: "UGX",
  },
  {
    name: "Hand Gloves",
    description: "Protective gloves for farm work.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "10000",
    priceCurrency: "UGX",
  },
  {
    name: "Greenhouse Cover",
    description: "UV-protected plastic cover for greenhouses.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "120000",
    priceCurrency: "UGX",
  },
  {
    name: "Machete",
    description: "Sharp machete for clearing bushes.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "25000",
    priceCurrency: "UGX",
  },
  {
    name: "Wheelbarrow",
    description: "Heavy-duty wheelbarrow for farm transport.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "80000",
    priceCurrency: "UGX",
  },
  {
    name: "Drip Irrigation Kit",
    description: "Complete kit for efficient water use.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "180000",
    priceCurrency: "UGX",
  },
  {
    name: "Broiler Chicks",
    description: "Day-old broiler chicks for poultry farming.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "3000",
    priceCurrency: "UGX",
  },
  {
    name: "Solar Water Pump",
    description: "Energy-efficient solar-powered water pump.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "1500000",
    priceCurrency: "UGX",
  },
  {
    name: "Rabbit Cage",
    description: "Spacious cage for rearing rabbits.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "90000",
    priceCurrency: "UGX",
  },
];
