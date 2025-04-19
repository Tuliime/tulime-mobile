import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants/theme";
import { TAdvert } from "@/types/advert";
import { useAuthStore } from "@/store/auth";
import { UpdateAdvertSingleImage } from "./UpdateAdvertSingleImage";
import { AppModal } from "@/components/shared/UI/Modal";
import Feather from "@expo/vector-icons/Feather";

const screenWidth = Dimensions.get("window").width * 0.999;

type UpdateAdvertImageProp = {
  images: TAdvert["advertImage"][];
};

export const UpdateAdvertImages: React.FC<UpdateAdvertImageProp> = (props) => {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const user = useAuthStore((state) => state.auth.user);
  const images = props.images;

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({
          item,
          index,
        }: {
          item: TAdvert["advertImage"];
          index: number;
        }) => (
          // update modal functionality here
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${item.url}` }}
              resizeMode="contain"
              style={styles.image}
            />
            <View
              style={{
                backgroundColor: COLORS.gray9,
                borderRadius: 4,
                padding: 4,
                paddingHorizontal: 6,
                position: "absolute",
                top: 8,
                left: 8,
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 10 }}>
                {`${index + 1}/${images.length}`}
              </Text>
            </View>
            {/* Edit image modal */}
            <View style={styles.editImageModalContainer}>
              <AppModal
                openModalElement={
                  <View style={styles.editContainer}>
                    <Feather name="edit" size={16} color={COLORS.white} />
                    <Text style={styles.editText}>Change</Text>
                  </View>
                }
              >
                <UpdateAdvertSingleImage image={item} />
              </AppModal>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
  imageContainer: {
    width: screenWidth - 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray3,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
    padding: 4,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  editImageModalContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  editContainer: {
    flexDirection: "row",
    gap: 4,
  },
  editText: {
    color: COLORS.white,
  },
});
