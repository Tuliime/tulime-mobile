import { COLORS } from "@/constants/theme";
import { Asset } from "@/types/assets";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
  const [imageDimensions, setImageDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});

  useEffect(() => {
    files.forEach((file) => {
      const uri = `data:${file.mimeType};base64,${file.base64}`;
      Image.getSize(uri, (width, height) => {
        setImageDimensions((prev) => ({
          ...prev,
          [file.name]: { width, height },
        }));
      });
    });
  }, [files]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {files.map((file, index) => {
        const dimensions = imageDimensions[file.name];
        const aspectRatio = dimensions
          ? dimensions.width / dimensions.height
          : 1;
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
              resizeMode="contain"
              source={{ uri: `data:${file.mimeType};base64,${file.base64}` }}
              style={[styles.image, { aspectRatio }]}
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
    height: 100,
    borderRadius: 8,
  },
});
