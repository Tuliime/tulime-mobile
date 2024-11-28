import React from "react";
import { View, Text } from "react-native";
import { SearchLayout } from "@/components/search/layout/SearchLayout";
import { useSearchStore } from "@/store/search";

const Search: React.FC = () => {
  const isSearching = useSearchStore((state) => state.isSearching);
  console.log("isSearching:", isSearching);

  return (
    <SearchLayout>
      <View>
        <Text>To define a search layout</Text>
      </View>
    </SearchLayout>
  );
};

export default Search;
