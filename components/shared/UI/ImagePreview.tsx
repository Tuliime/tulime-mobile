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
  onDelete: (index: number) => void;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  files,
  onDelete,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {files.map((file, index) => {
        return (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.deleteImageBtn}
              onPress={() => onDelete(index)}
            >
              <AntDesign name="close" size={14} color={COLORS.gray7} />
            </TouchableOpacity>
            <Image
              key={file.name}
              resizeMode="cover"
              source={{ uri: `data:${file.mimeType};base64,${file.base64}` }}
              style={styles.image}
            />
          </View>
        );
      })}
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
