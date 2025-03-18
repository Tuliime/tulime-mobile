import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import { MainLayout } from "@/components/shared/layout";
import { ModuleCard } from "@/components/shared/UI/ModuleCard";
import { COLORS, icons, SIZES } from "@/constants";
import { AdProductCard } from "@/components/ecommerce/AdProductCard";
import { TEcommerce } from "@/types/ecommerce";

const screenWidth = Dimensions.get("window").width * 0.99;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const index = () => {
  const renderAdItems = useCallback(
    ({ item }: { item: TEcommerce["adProduct"] }) => {
      return (
        <View style={{ width: itemWidth, marginHorizontal: 2 }}>
          <AdProductCard
            // id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            description={item.description}
            price={item.price}
            priceCurrency={item.priceCurrency}
          />
        </View>
      );
    },
    []
  );

  return (
    <MainLayout title="E-commerce">
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moduleContainer}
        >
          <ModuleCard
            name={"E-commerce"}
            description={"Sell and buy agro products to anyone in Uganda"}
            icon={icons.ecommerce1}
          />
          <ModuleCard
            name={"E-commerce"}
            description={"Sell and buy agro products to anyone in Uganda"}
            icon={icons.ecommerce1}
          />
          <ModuleCard
            name={"E-commerce"}
            description={"Sell and buy agro products to anyone in Uganda"}
            icon={icons.ecommerce1}
          />
          <ModuleCard
            name={"E-commerce"}
            description={"Sell and buy agro products to anyone in Uganda"}
            icon={icons.ecommerce1}
          />
        </ScrollView>
        <View style={styles.adsContainer}>
          <Text style={styles.adsTitle}>All ads</Text>
          <View style={styles.adsContainer}>
            <FlatList
              data={ads}
              keyExtractor={(item) => item.name}
              renderItem={renderAdItems}
              scrollEnabled={false}
              numColumns={numColumns}
              contentContainerStyle={{
                justifyContent: "center",
                gap: 8,
              }}
            />
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  moduleContainer: {
    flexDirection: "row",
    gap: 8,
    height: 100,
    alignItems: "center",
  },
  adsContainer: {
    gap: 16,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.gray7,
  },
});

export default index;

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
