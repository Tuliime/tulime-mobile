import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";
import { COLORS, SIZES } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { TFarmManager } from "@/types/farmManger";
import { FarmManagerCard } from "@/components/farmmanager/UI/FarmManagerCard";
import { VetDoctorCard } from "@/components/farmmanager/UI/VetDoctorCard";
import { farmManager } from "@/API/farmmanager";
import { vetDoctor } from "@/API/vetDoctor";
import { TVetDoctor } from "@/types/vetDoctor";
import { Button } from "@/components/shared/UI/Button";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const FarmManagersAndVets: React.FC = () => {
  const { category }: { category: string } = useGlobalSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    !!category ? category : "manager"
  );

  const setCategory = (category: string) => {
    router.setParams({ category });
    setActiveCategory(category);
  };

  const isActiveCategory = (category: string) => {
    return activeCategory === `${category}`;
  };

  // TODO: To define logic for the cursor based pagination
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`${activeCategory == "manager" ? "manager" : "vet"}`],
    queryFn: () => {
      if (activeCategory == "manager") {
        return farmManager.get({ limit: 20 });
      }
      return vetDoctor.get({ limit: 20 });
    },
  });

  const isFarmManager: boolean = activeCategory === "manager";
  const farmManagers: TFarmManager["farmmanager"][] =
    isFarmManager && data?.data;
  const hasFarmManagers = isArrayWithElements(farmManagers);

  const vetDoctors: TVetDoctor["vetdoctor"][] = !isFarmManager && data?.data;
  const hasVetDoctors = isArrayWithElements(vetDoctors);

  const renderFarmManagers = useCallback(
    ({ item }: { item: TFarmManager["farmmanager"] }) => {
      return (
        <View style={{ width: itemWidth, margin: 2 }}>
          <FarmManagerCard
            id={item.id}
            name={item.name}
            userID={item.userID}
            email={item.email}
            gender={item.gender}
            regNo={item.regNo}
            telNumber={item.telNumber}
            isVerified={item.isVerified}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            itemWidth={itemWidth}
          />
        </View>
      );
    },
    []
  );

  const renderVetDoctors = useCallback(
    ({ item }: { item: TVetDoctor["vetdoctor"] }) => {
      return (
        <View style={{ width: itemWidth, margin: 2 }}>
          <VetDoctorCard
            id={item.id}
            name={item.name}
            userID={item.userID}
            email={item.email}
            gender={item.gender}
            licenseNumber={item.licenseNumber}
            telNumber={item.telNumber}
            isVerified={item.isVerified}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            itemWidth={itemWidth}
          />
        </View>
      );
    },
    []
  );

  const showNoFarmManager: boolean = !hasFarmManagers && isFarmManager;
  const showNoVetDoctor: boolean = !hasVetDoctors && !isFarmManager;

  if (isPending) {
    return (
      <MainLayout title="Farm managers & Vet Doctors">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="Farm managers & Vet Doctors">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Farm managers & Vet Doctors">
      <View style={{ gap: 16, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            handlePress={() => setCategory("manager")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Farm managers"
            isActive={isActiveCategory("manager")}
          />
          <Button
            handlePress={() => setCategory("vet")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Veterinary doctors"
            isActive={isActiveCategory("vet")}
          />
        </View>
        <View>
          {isFarmManager ? (
            <Text>Farm managers</Text>
          ) : (
            <Text>Veterinary Doctors</Text>
          )}
        </View>
        {hasFarmManagers && (
          <FlatList
            data={farmManagers}
            keyExtractor={(item) => item.id}
            renderItem={renderFarmManagers}
            scrollEnabled={false}
            numColumns={numColumns}
            contentContainerStyle={{
              justifyContent: "center",
              columnGap: SIZES.medium,
              backgroundColor: "",
            }}
          />
        )}
        {showNoFarmManager && (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentText}>No Farm managers found</Text>
          </View>
        )}
        {hasVetDoctors && (
          <FlatList
            data={vetDoctors}
            keyExtractor={(item) => item.id}
            renderItem={renderVetDoctors}
            scrollEnabled={false}
            numColumns={numColumns}
            contentContainerStyle={{
              justifyContent: "center",
              columnGap: SIZES.medium,
              backgroundColor: "",
            }}
          />
        )}
        {showNoVetDoctor && (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentText}>
              No Veterinary Doctors found
            </Text>
          </View>
        )}
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
  headingText: {
    color: COLORS.gray7,
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
});

export default FarmManagersAndVets;
