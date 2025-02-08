import React from "react";
import { View } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

export const EmojiPicker: React.FC = () => {
  console.log("Inside EmojiPicker component");
  return (
    <View>
      <EmojiSelector
        category={Categories.symbols}
        onEmojiSelected={(emoji) => console.log(emoji)}
      />
    </View>
  );
};
