import { View, Text } from "react-native";
import React from "react";
import { PostAdvertLayout } from "@/components/ecommerce/adverts/layout/PostAdvertLayout";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const PostAdvert: React.FC = () => {
  return (
    <MainLayout title="Post Ad">
      <View>
        <PostAdvertLayout />
      </View>
    </MainLayout>
  );
};

export default PostAdvert;
