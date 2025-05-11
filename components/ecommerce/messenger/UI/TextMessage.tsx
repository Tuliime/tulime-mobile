import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { recoverTLMMSFromInvisible } from "@/utils/tlmmsVisibility";

type TextMessageProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  tagStyle?: StyleProp<TextStyle>;
};

export const TextMessage: React.FC<TextMessageProps> = (props) => {
  // Regular expression to match @tlmms...@tlmme tags
  const regex = /@tlmms(.*?)@tlmme/g;
  const text = recoverTLMMSFromInvisible(props.text);

  // Split the text into parts based on the regex pattern
  const parts = text.split(regex);

  return (
    <Text style={props.style}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Text key={index} style={props.tagStyle}>
            @{part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};
