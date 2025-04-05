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
import { MainLayout } from "@/components/shared/layout";
import { COLORS, SIZES } from "@/constants";
import { news } from "@/API/news";
import { useQuery } from "@tanstack/react-query";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { TNews } from "@/types/news";
import { NewsCard } from "@/components/news/UI/NewsCard";
import { Button } from "@/components/shared/UI/Button";

const screenWidth = Dimensions.get("window").width * 0.98;

const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

// TODO: To add source url to the news schema and linking action
const News: React.FC = () => {
  const { category }: { category: string } = useGlobalSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    !!category ? category : "G.O.U"
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
    queryKey: [`news-${activeCategory}`],
    queryFn: () => {
      return news.get({
        limit: 20,
        category: activeCategory,
        cursor: "",
      });
    },
  });

  const newsData: TNews["news"][] = data?.data ?? [];
  const hasNews = isArrayWithElements(newsData);

  const renderNewsItems = useCallback(({ item }: { item: TNews["news"] }) => {
    return (
      <View style={{ width: "100%" }}>
        <NewsCard
          id={item.id}
          title={item.title}
          description={item.description}
          category={item.category}
          imageUrl={item.imageUrl}
          source={item.source}
          imagePath={item.imagePath}
          postedAt={item.postedAt}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
          itemWidth={itemWidth}
        />
      </View>
    );
  }, []);

  if (isPending) {
    return (
      <MainLayout title="G.O.U News & Conferences">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="G.O.U News & Conferences">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="G.O.U News & Conferences">
      <View style={{ flex: 1, gap: 16 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            handlePress={() => setCategory("G.O.U")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="G.O.U"
            isActive={isActiveCategory("G.O.U")}
          />
          <Button
            handlePress={() => setCategory("news")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="News"
            isActive={isActiveCategory("news")}
          />
          <Button
            handlePress={() => setCategory("conference")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Conference"
            isActive={isActiveCategory("conference")}
          />
          <Button
            handlePress={() => setCategory("work shop")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Work shop"
            isActive={isActiveCategory("work shop")}
          />
        </View>
        {hasNews && (
          <FlatList
            data={newsData!}
            keyExtractor={(item) => item.id}
            renderItem={renderNewsItems}
            scrollEnabled={false}
            numColumns={1}
            contentContainerStyle={{
              justifyContent: "center",
              columnGap: SIZES.medium,
              rowGap: 36,
            }}
          />
        )}
        {!hasNews && (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentText}>
              {` No data for ${activeCategory}`}
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

export default News;
