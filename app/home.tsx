import React, { useCallback } from "react";
import { HomeLayout } from "@/components/shared/layout";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { COLORS, icons, SIZES } from "@/constants";
import { NotificationCount } from "@/components/notification/NotificationCount";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ServiceCard } from "@/components/shared/UI/ServiceCard";
import { TService } from "@/types/service";
import { Logout } from "@/components/auth/Logout";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width * 0.98;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

export default function Home() {
  const services: TService[] = [
    {
      name: "My Profile",
      icon: icons.account,
      backgroundColor: COLORS.yellow5,
      link: "/settings",
    },
    {
      name: "Agro Product Prices",
      icon: icons.corn,
      backgroundColor: COLORS.green5,
      link: "/agroproducts",
    },
    {
      name: "Farm Inputs & Machinery",
      icon: icons.tractor,
      backgroundColor: COLORS.pink8,
      link: "/farminputs",
    },
    {
      name: "Vacancies  & Tenders",
      icon: icons.trend,
      backgroundColor: COLORS.blue5,
      link: "/vacancies",
    },
    {
      name: "G.O.U News, Conferences  & Workshops",
      icon: icons.education,
      backgroundColor: COLORS.yellow5,
      link: "/news",
    },
    {
      name: "Farm Managers & Veterinary Doctors",
      icon: icons.manager,
      backgroundColor: COLORS.green5,
      link: "/farmmanagers",
    },
    {
      name: "E-commerce",
      icon: icons.ecommerce2,
      backgroundColor: COLORS.pink8,
      link: "/ecommerce",
    },
  ];

  const renderServiceItem = useCallback(({ item }: { item: TService }) => {
    return (
      <View style={{ width: itemWidth, margin: 2 }}>
        <ServiceCard
          name={item.name}
          icon={item.icon}
          backgroundColor={item.backgroundColor}
          link={item.link}
        />
      </View>
    );
  }, []);

  const navigateToChatroom = () => {
    router.push("/chatroom");
  };

  const navigateToSearch = () => {
    router.push("/search");
  };

  const navigateToBookmark = () => {
    router.push("/ecommerce/bookmark");
  };

  return (
    <HomeLayout
      header={
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>Tulime</Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <TouchableOpacity onPress={() => navigateToBookmark()}>
                <Ionicons
                  name="bookmark-outline"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <NotificationCount />
              <Logout />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigateToSearch()}
            style={styles.headerSearchContainer}
          >
            <View style={styles.headerSearch}>
              <Text style={styles.headerSearchText}>Search Tulime</Text>
              <View>
                <MaterialIcons name="search" size={24} color={COLORS.primary} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitleText}>Tulime services</Text>
        <FlatList
          data={services}
          keyExtractor={(item) => item.name}
          renderItem={renderServiceItem}
          scrollEnabled={false}
          numColumns={numColumns}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            columnGap: SIZES.medium,
            backgroundColor: "",
          }}
        />
        <TouchableOpacity
          style={styles.chatroomContainer}
          onPress={() => navigateToChatroom()}
        >
          <Image
            source={icons.logoTemp}
            resizeMode="contain"
            style={styles.chatroomIcon}
          />
          <Text style={styles.chatroomTitleText}>Tulime Community Chatfam</Text>
          <Text style={styles.chatroomDescriptionText}>
            Connect, share ideas, and grow together in the heart of Tulime!
          </Text>
        </TouchableOpacity>
      </View>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    gap: 8,
    marginTop: -16,
  },
  headerTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 24,
    color: COLORS.white,
  },
  headerSearchContainer: {
    width: "100%",
  },
  headerSearch: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerSearchText: {
    color: COLORS.gray6,
  },
  contentContainer: {
    width: "100%",
    gap: 16,
  },
  contentTitleText: {
    color: COLORS.gray7,
    fontSize: 16,
    fontWeight: 500,
  },
  chatroomContainer: {
    backgroundColor: COLORS.gray1,
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  chatroomIcon: {
    width: 68,
    height: 68,
    objectFit: "contain",
  },
  chatroomTitleText: {
    fontWeight: 700,
    color: COLORS.gray7,
    textAlign: "center",
  },
  chatroomDescriptionText: {
    fontSize: 12,
    color: COLORS.gray7,
    textAlign: "center",
  },
});
