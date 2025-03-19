import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AdBookmarkCard } from "@/components/ecommerce/AdBookmarkCard";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { COLORS } from "@/constants";

const BookMarks: React.FC = () => {
  return (
    <MainLayout title="Bookmarks" childrenStyles={{ padding: 0 }}>
      <View style={styles.container}>
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
        <AdBookmarkCard />
      </View>
    </MainLayout>
  );
};

export default BookMarks;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    backgroundColor: COLORS.gray3,
  },
});
