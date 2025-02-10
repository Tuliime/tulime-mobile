import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
// import { useGetAssetInfo } from "@/hooks/useGetAssetInfo";
// import { formatFileSize } from "@/utils/formatFileSize";
import { COLORS } from "@/constants";
const screenHeight = Dimensions.get("window").height * 0.999;
const maxImageHeight = screenHeight * 0.5;

type ImageDisplayProps = {
  uri: string;
  style?: StyleProp<ViewStyle>;
};

export const ImageDisplay: React.FC<ImageDisplayProps> = (props) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // const { data: asset } = useGetAssetInfo({ url: props.uri });
  // const hasFileSize = !!asset?.size;

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        setLoading(() => true);
        Image.getSize(props.uri, (width, height) => {
          setDimensions({ width, height });
        });
      } catch (error) {
        console.error("Error fetching image details:", error);
      } finally {
        setLoading(() => false);
      }
    };

    fetchImageDetails();
  }, [props.uri]);

  // if (loading) {
  if (loading || !dimensions) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="small" color={COLORS.gray7} />
        <Text style={styles.loadingIndicatorText}>file loading ...</Text>
      </View>
    );
  }

  // if (!dimensions) {
  //   return <Text style={styles.errorText}>Failed to load image</Text>;
  // }

  const aspectRatio = dimensions?.width! / dimensions?.height!;

  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={{ uri: props.uri }}
        style={[styles.image, { aspectRatio: aspectRatio }]}
        resizeMode="contain"
      />
      {/* {hasFileSize && (
        <Text style={styles.fileSizeText}>{formatFileSize(asset?.size)}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 4,
  },
  image: {
    maxHeight: maxImageHeight,
    width: "100%",
    borderRadius: 12,
  },
  fileSizeText: {
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.gray6,
    position: "absolute",
    right: 4,
    bottom: 2,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  loadingIndicatorContainer: {
    width: "100%",
    padding: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  loadingIndicatorText: {
    color: COLORS.gray7,
    fontSize: 12,
  },
});
