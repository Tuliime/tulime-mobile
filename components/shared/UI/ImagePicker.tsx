import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";
import { Asset } from "@/types/assets";
import Toast from "react-native-toast-message";

type ImagePickerProps = {
  onPick: (files: Asset["file"][]) => void;
  onLoading: (isLoading: boolean) => void;
  pickElement?: ReactNode;
  limit?: number;
  multiple?: boolean;
};

export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const MAX_FILE_LIMIT = 5 * 1024 * 1024; /* 5 MB */
  const limit = props.limit ? props.limit : 10; //Default limit is 10
  const multiple: boolean = props.multiple ? props.multiple : true; //Default multiple is true

  const pickImageHandler = async () => {
    try {
      const files: Asset["file"][] = [];
      props.onPick(files);
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: multiple,
      });

      if (result.canceled || !result.assets) return;

      props.onLoading(true);
      if (result.assets.length > limit) {
        props.onLoading(false);
        throw new Error(`Cannot upload more than ${limit} images at once!`);
      }

      for (let i = 0; i < result.assets.length; i++) {
        const file = result.assets[i];
        if (file?.size! > MAX_FILE_LIMIT) {
          props.onLoading(false);
          throw new Error(`Selected file ${file.name} size exceeds 5mb limit!`);
        }

        const fileBase64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        files.push({
          name: file.name,
          mimeType: file.mimeType!,
          uri: file.uri,
          base64: fileBase64,
        });

        const isLastAsset = i === result.assets.length - 1;
        if (isLastAsset) {
          props.onPick(files);
          props.onLoading(false);
        }
      }
    } catch (err: any) {
      const files: Asset["file"][] = [];
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: err.message,
        position: "top",
        visibilityTime: 8000,
        autoHide: true,
      });
      console.error(err);
    }
  };

  return (
    <TouchableOpacity onPress={pickImageHandler}>
      {!!props.pickElement ? (
        props.pickElement
      ) : (
        <Ionicons name="attach" size={28} color={COLORS.gray7} />
      )}
    </TouchableOpacity>
  );
};
