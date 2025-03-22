import { COLORS } from "@/constants";
import { Auth } from "@/types/auth";
import React from "react";
import { StyleSheet, Text, View, Image, TextStyle } from "react-native";

type ProfileAvatarProps = {
  user: Auth["user"];
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (props) => {
  const hasImage: boolean = !!props.user.imageUrl;
  const imageUrl: string = props.user.imageUrl;
  const firstNameChar: string = props.user.name.charAt(0).toUpperCase();
  const profileBgColor: string = props.user.profileBgColor;
  const isWidthGiven: boolean = !!props.width;
  const isHeightGiven: boolean = !!props.height;
  const isFontSizeGiven: boolean = !!props.fontSize;
  const isFontWeightGiven: boolean = !!props.fontWeight;

  return (
    <View style={styles.container}>
      {hasImage && (
        <Image
          source={{ uri: `${imageUrl}` }}
          resizeMode="contain"
          style={[
            styles.profileImage,
            {
              width: isWidthGiven ? props.width : 44,
              height: isHeightGiven ? props.height : 44,
            },
          ]}
        />
      )}
      {!hasImage && (
        <View
          style={[
            styles.profileBgContainer,
            {
              backgroundColor: profileBgColor,
              width: isWidthGiven ? props.width : 44,
              height: isHeightGiven ? props.height : 44,
            },
          ]}
        >
          <Text
            style={[
              styles.profileBgText,
              {
                fontSize: isFontSizeGiven ? props.fontSize : 16,
                fontWeight: isFontWeightGiven ? props.fontWeight : 700,
              },
            ]}
          >
            {firstNameChar}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 999,
  },
  profileBgContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  profileBgText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 700,
  },
});
