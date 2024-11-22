import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Search: React.FC = () => {
  return (
    <SecondaryLayout title="Search">
      <View>
        <Text>To define a search layout</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Search;
