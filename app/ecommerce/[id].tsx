import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { addCommasToNumber } from "@/utils/addCommaNumber";
import { MainLayout } from "@/components/shared/layout";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";

const ProductDetailsScreen: React.FC = () => {
  return (
    <MainLayout title="E-commerce">
      <View style={styles.container}>
        {/* product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${ads[0].imageUrl}` }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* product Content */}
        <View style={styles.contentContainer}>
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{ads[0].name}</Text>
            <Text style={styles.productPrice}>{`${
              ads[0].priceCurrency
            } ${addCommasToNumber(parseInt(ads[0].price))}`}</Text>
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
                <TouchableOpacity
                  style={[
                    styles.actionsBtn,
                    {
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.blue7,
                      width: "50%",
                    },
                  ]}
                >
                  <MaterialIcons
                    name="feedback"
                    size={20}
                    color={COLORS.blue7}
                    style={styles.actionsIcon}
                  />
                  <Text style={[styles.actionsText, { color: COLORS.blue7 }]}>
                    Give Feedback
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionsBtn,
                    {
                      backgroundColor: COLORS.white,
                      borderWidth: 1,
                      borderColor: COLORS.red7,
                      width: "48%",
                    },
                  ]}
                >
                  <Foundation
                    name="flag"
                    size={20}
                    color={COLORS.red7}
                    style={styles.actionsIcon}
                  />
                  <Text style={[styles.actionsText, { color: COLORS.red7 }]}>
                    Report Abuse
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bookmarkIconContainer}>
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
            />
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.SafetyTipsContainer}>
          <Text style={styles.SafetyTipsTitle}>Safety Tips</Text>
          <View style={styles.SafetyTipsContentContainer}>
            <View style={styles.SafetyTipBullet}>
              <Entypo
                name="dot-single"
                size={24}
                color={COLORS.gray7}
                style={styles.dotIcon}
              />
              <Text style={styles.SafetyTipText}>
                Never make upfront payments, even for delivery.
              </Text>
            </View>
            <View style={styles.SafetyTipBullet}>
              <Entypo
                name="dot-single"
                size={24}
                color={COLORS.gray7}
                style={styles.dotIcon}
              />
              <Text style={styles.SafetyTipText}>
                Always meet the seller in a well-lit, public location.
              </Text>
            </View>
            <View style={styles.SafetyTipBullet}>
              <Entypo
                name="dot-single"
                size={24}
                color={COLORS.gray7}
                style={styles.dotIcon}
              />
              <Text style={styles.SafetyTipText}>
                Carefully inspect the item before making a decision.
              </Text>
            </View>
            <View style={styles.SafetyTipBullet}>
              <Entypo
                name="dot-single"
                size={24}
                color={COLORS.gray7}
                style={styles.dotIcon}
              />
              <Text style={styles.SafetyTipText}>
                Ensure the item being packed is the same one you inspected.
              </Text>
            </View>
            <View style={styles.SafetyTipBullet}>
              <Entypo
                name="dot-single"
                size={24}
                color={COLORS.gray7}
                style={styles.dotIcon}
              />
              <Text style={styles.SafetyTipText}>
                Complete the payment only when fully satisfied with the
                purchase.
              </Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </View>
    </MainLayout>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
    padding: 4,
  },
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
    // padding: 8,
    padding: 16,
    gap: 4,
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
  locationContainer: {
    flexDirection: "row",
    gap: 4,
  },
  locationIcon: {
    marginLeft: -6,
  },
  locationText: {
    color: COLORS.gray6,
  },
  bookmarkIconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    elevation: 5,
  },
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
  SafetyTipsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    gap: 8,
    width: "100%",
  },
  SafetyTipsTitle: {
    color: COLORS.gray8,
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
  },
  SafetyTipsContentContainer: {
    gap: 4,
    width: "100%",
  },
  SafetyTipBullet: {
    flexDirection: "row",
    width: "100%",
  },
  dotIcon: {
    marginLeft: -8,
  },
  SafetyTipText: {
    color: COLORS.gray7,
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
