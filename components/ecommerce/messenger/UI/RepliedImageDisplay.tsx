import React from "react";
import { View, Image, StyleSheet } from "react-native";

type RepliedImageDisplayProps = {
  uri: string;
};

export const RepliedImageDisplay: React.FC<RepliedImageDisplayProps> = (
  props
) => {
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
});
