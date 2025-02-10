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
        <Text style={styles.loadingIndicatorText}>file loading ...</Text>
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
    height: 100,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: "100%",
    maxHeight: 80,
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
