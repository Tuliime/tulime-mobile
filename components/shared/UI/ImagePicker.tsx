import React from "react";
import { TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";
import { Asset } from "@/types/assets";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";

type ImagePickerProps = {
  onPick: (files: Asset["file"][]) => void;
  onLoading: (isLoading: boolean) => void;
};

export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const MAX_FILE_LIMIT = 5 * 1024 * 1024; /* 5 MB */

  const pickImageHandler = async () => {
    try {
      const files: Asset["file"][] = [];
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: true,
      });
      console.log("result: ", result); //TODO: To be removed

      if (result.canceled || !result.assets) return;

      props.onLoading(true);
      if (result.assets.length > 10) {
        props.onLoading(false);
        throw new Error(`Cannot upload more than 10 images at once!`);
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

        const arrayBuffer = new Uint8Array(Buffer.from(fileBase64, "base64"));

        files.push({
          name: file.name,
          mimeType: file.mimeType!,
          arrayBuffer: arrayBuffer,
          base64: fileBase64,
          uri: file.uri,
        });

        const isLastAsset = i === result.assets.length - 1;
        if (isLastAsset) {
          props.onPick(files);
          props.onLoading(false);
        }
      }
    } catch (err: any) {
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
      <Ionicons name="attach" size={28} color={COLORS.gray7} />
    </TouchableOpacity>
  );
};
