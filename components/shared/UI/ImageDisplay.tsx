import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useGetAssetInfo } from "@/hooks/useGetAssetInfo";
import { formatFileSize } from "@/utils/formatFileSize";
import { COLORS } from "@/constants";

type ImageDisplayProps = {
  uri: string;
  // displayUnder?: "sender" | "recipient";
};

export const ImageDisplay: React.FC<ImageDisplayProps> = (props) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  // const isDisplayUnderSender: boolean = props.displayUnder === "sender";

  const { data: asset } = useGetAssetInfo({ url: props.uri });
  const hasFileSize = !!asset?.size;

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        Image.getSize(props.uri, (width, height) => {
          setDimensions({ width, height });
        });
      } catch (error) {
        console.error("Error fetching image details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [props.uri]);

  if (loading) {
    return <ActivityIndicator size="small" color="#999" />;
  }

  if (!dimensions) {
    return <Text style={styles.errorText}>Failed to load image</Text>;
  }

  const aspectRatio = dimensions.width / dimensions.height;
  console.log("dimensions.width: ", dimensions.width);
  console.log("dimensions.height: ", dimensions.height);
  console.log("aspectRatio: ", aspectRatio);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.uri }}
        style={[
          styles.image,
          {
            aspectRatio: aspectRatio,
            // backgroundColor: isDisplayUnderSender
            //   ? COLORS.green2
            //   : COLORS.gray4,
          },
        ]}
        resizeMode="contain"
      />
      {hasFileSize && (
        <Text style={styles.fileSizeText}>{formatFileSize(asset?.size)}</Text>
      )}
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
});
