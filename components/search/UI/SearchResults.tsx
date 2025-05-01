// import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
// import React, { useCallback } from "react";
// import { TSearch } from "@/types/search";
// import { TAdvert } from "@/types/advert";
// import { AdProductCard } from "@/components/ecommerce/UI/AdProductCard";
// import { COLORS, SIZES } from "@/constants";
// import { TNews } from "@/types/news";
// import { NewsCard } from "@/components/news/UI/NewsCard";

// const screenWidth = Dimensions.get("window").width * 0.999;
// const numColumns = 2;
// const itemWidth = screenWidth / numColumns - SIZES.medium;

// type SearchResultsProps = {
//   results: TSearch["results"];
// };

// export const SearchResults: React.FC<SearchResultsProps> = (props) => {
//   console.log("props.results ", props.results);
//   const adverts = props.results?.adverts!;
//   const hasAdverts = props.results?.adverts!?.length > 0;
//   const news = props.results?.news!;
//   const hasNews = props.results?.news!?.length > 0;

//   console.log("hasAdverts", hasAdverts);
//   console.log("hasNews", hasNews);

//   const renderAdItems = useCallback(({ item }: { item: TAdvert["advert"] }) => {
//     return (
//       <View style={{ width: itemWidth - 2, marginHorizontal: 2 }}>
//         <AdProductCard
//           name={""}
//           imageUrl={""}
//           description={""}
//           price={""}
//           priceCurrency={""}
//           advert={item}
//         />
//       </View>
//     );
//   }, []);

//   const renderNewsItems = useCallback(({ item }: { item: TNews["news"] }) => {
//     return (
//       <View style={{ width: "100%" }}>
//         <NewsCard
//           id={item.id}
//           title={item.title}
//           description={item.description}
//           category={item.category}
//           imageUrl={item.imageUrl}
//           source={item.source}
//           imagePath={item.imagePath}
//           postedAt={item.postedAt}
//           createdAt={item.createdAt}
//           updatedAt={item.updatedAt}
//           itemWidth={itemWidth}
//         />
//       </View>
//     );
//   }, []);

//   return (
//     <View style={styles.resultView}>
//       {hasAdverts && (
//         <View style={[styles.resultCategoryView, { padding: 16 }]}>
//           <Text style={styles.resultCategoryText}>Ads</Text>
//           <FlatList
//             data={adverts}
//             keyExtractor={(item) => item.id}
//             renderItem={renderAdItems}
//             scrollEnabled={false}
//             numColumns={numColumns}
//             contentContainerStyle={{
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8,
//             }}
//           />
//         </View>
//       )}
//       {hasNews && (
//         <View style={styles.resultCategoryView}>
//           <Text style={styles.resultCategoryText}>News</Text>
//           <FlatList
//             data={news}
//             keyExtractor={(item) => item.id}
//             renderItem={renderNewsItems}
//             scrollEnabled={false}
//             numColumns={1}
//             contentContainerStyle={{
//               justifyContent: "center",
//               columnGap: SIZES.medium,
//               rowGap: 36,
//             }}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   resultView: {
//     flex: 1,
//     justifyContent: "flex-start",
//     gap: 24,
//   },
//   resultCategoryView: {
//     width: screenWidth,
//     gap: 8,
//   },
//   resultCategoryText: {
//     color: COLORS.gray8,
//   },
// });

import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { TSearch } from "@/types/search";
import { TAdvert } from "@/types/advert";
import { AdProductCard } from "@/components/ecommerce/UI/AdProductCard";
import { COLORS, SIZES } from "@/constants";
import { TNews } from "@/types/news";
import { NewsCard } from "@/components/news/UI/NewsCard";

const screenWidth = Dimensions.get("window").width * 0.999;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

type SearchResultsProps = {
  results: TSearch["results"];
};

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  console.log("props.results ", props.results);
  const adverts = props.results?.adverts!;
  const hasAdverts = props.results?.adverts!?.length > 0;
  const news = props.results?.news!;
  const hasNews = props.results?.news!?.length > 0;

  console.log("hasAdverts", hasAdverts);
  console.log("hasNews", hasNews);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.resultView}>
        {hasAdverts && (
          <View style={[styles.resultCategoryView, { padding: 16 }]}>
            <Text style={styles.resultCategoryText}>Ads</Text>
            <View style={styles.advertsGrid}>
              {adverts.map((item: TAdvert["advert"]) => (
                <View
                  key={item.id}
                  style={{ width: itemWidth - 2, marginHorizontal: 2 }}
                >
                  <AdProductCard
                    name={""}
                    imageUrl={""}
                    description={""}
                    price={""}
                    priceCurrency={""}
                    advert={item}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
        {hasNews && (
          <View style={styles.resultCategoryView}>
            <Text
              style={[styles.resultCategoryText, { paddingHorizontal: 16 }]}
            >
              News
            </Text>
            <View style={styles.newsContainer}>
              {news.map((item: TNews["news"]) => (
                <View key={item.id} style={{ width: "100%" }}>
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
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  resultView: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 24,
  },
  resultCategoryView: {
    width: screenWidth,
    gap: 8,
  },
  resultCategoryText: {
    color: COLORS.gray8,
  },
  advertsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  newsContainer: {
    width: "100%",
    gap: 36,
  },
});
