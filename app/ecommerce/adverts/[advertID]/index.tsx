import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants";
import { addCommasToNumber } from "@/utils/addCommaNumber";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { AppModal } from "@/components/shared/UI/Modal";
import { PostFeedback } from "@/components/ecommerce/UI/PostFeedback";
import { ReportAbuse } from "@/components/ecommerce/UI/ReportAbuse";
import { router, useLocalSearchParams } from "expo-router";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { advert } from "@/API/advert";
import { TAdvert } from "@/types/advert";
import { SafetyTips } from "@/components/ecommerce/UI/SafetyTips";
import { useAuthStore } from "@/store/auth";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width * 0.999;

const ProductDetailsScreen: React.FC = () => {
  const { advertID } = useLocalSearchParams<{ advertID: string }>();
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const user = useAuthStore((state) => state.auth.user);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setIndex(newIndex);
  };

  const navigateToAdvertEdit = () => {
    router.push(`/ecommerce/adverts/${advertID}/edit`);
  };

  const navigateToMessenger = () => {
    router.push("/ecommerce/messenger");
  };

  const navigateToStoreDetailScreen = (storeID: string) => {
    router.push(`/ecommerce/store/${storeID}`);
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`advert-${advertID}`],
    queryFn: () => {
      return advert.get({ advertID: advertID });
    },
  });

  const advertData: TAdvert["advert"] = data?.data ?? {};
  // const hasAdvertData = !!advertData.id
  const isCurrentUser = advertData.userID === user.id;
  const images = advertData.images;

  if (isPending) {
    return (
      <MainLayout title="E-commerce">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="E-commerce">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="E-commerce">
      <View style={styles.container}>
        {/* Ad Image slider */}
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          renderItem={({
            item,
            index,
          }: {
            item: TAdvert["advertImage"];
            index: number;
          }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${item.url}` }}
                resizeMode="contain"
                style={styles.image}
              />
              <View
                style={{
                  backgroundColor: COLORS.gray9,
                  borderRadius: 4,
                  padding: 4,
                  paddingHorizontal: 6,
                  position: "absolute",
                  top: 8,
                  left: 8,
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: 10 }}>
                  {`${index + 1}/${images.length}`}
                </Text>
              </View>
            </View>
          )}
        />

        {/* product Content */}
        <View style={styles.contentContainer}>
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{advertData.productName}</Text>
            <Text style={styles.productPrice}>{`${
              ads[0].priceCurrency
            } ${addCommasToNumber(parseInt(ads[0].price))}`}</Text>
            <TouchableOpacity
              style={styles.businessContainer}
              onPress={(_: any) =>
                navigateToStoreDetailScreen(advertData.store?.id!)
              }
            >
              <Ionicons name="business" size={20} color={COLORS.gray8} />
              <Text style={styles.businessText}>{advertData.store?.name}</Text>
            </TouchableOpacity>
            <View style={styles.locationContainer}>
              <Entypo
                name="location-pin"
                size={24}
                color={COLORS.blue7}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>Kampala, Central</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={navigateToMessenger}
                style={[
                  styles.actionsBtn,
                  { backgroundColor: COLORS.primary, paddingVertical: 10 },
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
              <View style={styles.actionsFeedbackReport}>
                {/* Give feedback */}
                <AppModal
                  openModalElement={
                    <View
                      style={[
                        styles.actionsBtn,
                        {
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.blue7,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name="feedback"
                        size={20}
                        color={COLORS.blue7}
                        style={styles.actionsIcon}
                      />
                      <Text
                        style={[styles.actionsText, { color: COLORS.blue7 }]}
                      >
                        Give Feedback
                      </Text>
                    </View>
                  }
                >
                  <PostFeedback />
                </AppModal>

                {/* Report Abuse  */}
                <AppModal
                  openModalElement={
                    <View
                      style={[
                        styles.actionsBtn,
                        {
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.red7,
                        },
                      ]}
                    >
                      <Foundation
                        name="flag"
                        size={20}
                        color={COLORS.red7}
                        style={styles.actionsIcon}
                      />
                      <Text
                        style={[styles.actionsText, { color: COLORS.red7 }]}
                      >
                        Report Abuse
                      </Text>
                    </View>
                  }
                >
                  <ReportAbuse />
                </AppModal>
              </View>
            </View>
          </View>
          <View style={styles.bookmarkEditContainer}>
            <View style={styles.bookmarkContainer}>
              {/* <Ionicons
            name="bookmark"
            size={24}
            color={COLORS.primary}
            style={styles.bookmarkIcon}
          /> */}
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={COLORS.primary}
                style={styles.bookmarkIcon}
              />
            </View>
            {isCurrentUser && (
              <TouchableOpacity
                style={styles.editContainer}
                onPress={navigateToAdvertEdit}
              >
                <Feather
                  name="edit"
                  size={20}
                  color={COLORS.primary}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Safety Tips */}
        <SafetyTips />
      </View>
    </MainLayout>
  );
};

export default ProductDetailsScreen;

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
  container: {
    width: "100%",
    gap: 16,
  },
  imageContainer: {
    width: screenWidth - 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray3,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
    padding: 4,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  slide: { borderRadius: 10, overflow: "hidden" },
  contentContainer: {
    width: "100%",
    position: "relative",
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    elevation: 3,
  },
  productContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.primary,
  },
  businessContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  businessText: {
    color: COLORS.gray7,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  locationIcon: {
    marginLeft: -6,
  },
  locationText: {
    color: COLORS.gray6,
  },
  bookmarkEditContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  bookmarkContainer: {
    // position: "absolute",
    // top: 16,
    // right: 16,
    // width: 36,
    // height: 36,
    // backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 999,
    // elevation: 5,
  },
  bookmarkIcon: {
    // position: "absolute",
    // top: 16,
    // right: 14,
  },
  editContainer: {},
  editIcon: {},
  actionsContainer: {
    marginTop: 8,
    gap: 16,
  },
  actionsBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: 8,
    borderRadius: 8,
    width: "100%",
  },
  actionsIcon: {},
  actionsText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 500,
  },
  actionsFeedbackReport: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
});

const ads = [
  {
    name: "Maize Seeds",
    description: "High-yield hybrid maize seeds for planting.",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
    price: "25000",
    priceCurrency: "UGX",
  },
];

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
