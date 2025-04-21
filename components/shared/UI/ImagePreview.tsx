import { COLORS } from "@/constants/theme";
import { Asset } from "@/types/assets";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

type ImagePreviewProps = {
  files: Asset["file"][];
  urls?: string[];
  onDelete: (index: number) => void;
  canDelete?: boolean;
  isLocalImage?: boolean;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  files,
  onDelete,
  canDelete,
  isLocalImage,
  urls,
}) => {
  const showDeleteIcon = canDelete !== undefined ? canDelete : true;
  const isLocal = isLocalImage !== undefined ? isLocalImage : true;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {isLocal && (
        <>
          {files.map((file, index) => {
            return (
              <View key={index} style={styles.imageContainer}>
                {showDeleteIcon && (
                  <TouchableOpacity
                    style={styles.deleteImageBtn}
                    onPress={() => onDelete(index)}
                  >
                    <AntDesign name="close" size={14} color={COLORS.gray7} />
                  </TouchableOpacity>
                )}
                <Image
                  resizeMode="cover"
                  source={{
                    uri: `data:${file.mimeType};base64,${file.base64}`,
                  }}
                  style={styles.image}
                />
              </View>
            );
          })}
        </>
      )}
      {!isLocal && (
        <>
          {urls!.map((url, index) => {
            return (
              <View key={index} style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  source={{ uri: url }}
                  style={styles.image}
                />
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingVertical: 2,
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
    width: 80,
    height: 80,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: COLORS.gray4,
    borderRadius: 8,
  },
  deleteImageBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
    backgroundColor: COLORS.gray1,
    borderRadius: 1000,
    zIndex: 100,
  },
  image: {
    width: 80,
    height: "100%",
    maxHeight: 80,
    borderRadius: 8,
  },
});
