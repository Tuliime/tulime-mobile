import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import { COLORS } from "@/constants";

type SwipedImageDisplayProps = {
  uri: string;
};

export const SwipedImageDisplay: React.FC<SwipedImageDisplayProps> = (
  props
) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

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

  if (loading || !dimensions) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="small" color={COLORS.gray7} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.uri }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 4,
    width: 80,
    height: 80,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: "100%",
    maxHeight: 80,
    borderRadius: 8,
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
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 8,
    width: 80,
    height: 80,
    gap: 8,
    backgroundColor: COLORS.gray5,
  },
  loadingIndicatorText: {
    color: COLORS.gray7,
    fontSize: 12,
  },
});
