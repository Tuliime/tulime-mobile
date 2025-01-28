import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const FarmInputDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  // TODO: Fetch data from the api using the provided id
  return (
    <View>
      <Text>Farm input details screen</Text>
    </View>
  );
};

export default FarmInputDetailsScreen;
