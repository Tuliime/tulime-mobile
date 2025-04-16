import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { ImagePicker } from "../../../shared/UI/ImagePicker";
import { Asset } from "@/types/assets";
import Feather from "@expo/vector-icons/Feather";
import { ImagePreview } from "../../../shared/UI/ImagePreview";
import Entypo from "@expo/vector-icons/Entypo";
import { advert } from "@/API/advert";
import { router, useGlobalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { TAdvert } from "@/types/advert";

export const PostAdvertImages: React.FC = () => {
  const {
    postAdvertStep,
    advertID,
    productName,
  }: { postAdvertStep: string; advertID: string; productName: string } =
    useGlobalSearchParams();

  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [fileList, setFileList] = useState<Asset["file"][]>([]);

  const showImagePreview: boolean = !!fileList[0]?.name;
  const hasFile: boolean = !!fileList[0]?.name;
  const initialFormValues: { files: Asset["file"][] } = {
    files: [],
  };

  const { isPending, mutate } = useMutation({
    mutationFn: advert.postImages,
    onSuccess: (response: any) => {
      console.log("post advertImages response:", response);
      const images = response.data as TAdvert["advertImage"][];

      router.push(
        `/ecommerce/adverts/new?postAdvertStep=${3}&advertID=${advertID}&productName=${productName}&advertImage=${
          images[0].url
        }`
      );

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: response.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    },
    onError: (error) => {
      console.log("Error:", error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: error.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    },
  });

  const onPickImageHandler = (files: Asset["file"][]) => {
    setFileList(() => files);
  };

  const onLoadImageHandler = (isLoading: boolean) => {
    setIsLoadingFile(() => isLoading);
  };

  const onDeleteImageHandler = (inputIndex: number) => {
    console.log("inputIndex to be removed: ", inputIndex);
    setFileList(() => fileList.filter((_, index) => index !== inputIndex));
  };

  const advertImageValidationSchema = yup.object().shape({});

  const advertImageSubmitHandler = (values: { files: Asset["file"][] }) => {
    const formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append(
        "files",
        {
          uri: fileList[i].uri,
          name: "media",
          type: fileList[i].mimeType,
        } as any,
        fileList[i].name
      );
    }
    mutate({ advertID: advertID, formData: formData });
  };

  const disableSubmitButton = (): boolean => {
    if (!hasFile) return true;
    return isPending;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Product: {productName}</Text>
      </View>
      <Formik
        validationSchema={advertImageValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => advertImageSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            {!showImagePreview && (
              <View style={styles.imagePickerContainer}>
                <View style={styles.imagePickerContent}>
                  <Text style={styles.imagePickerTitleSecondary}>
                    You can upload a minimum of 2 pictures and a maximum of 12
                  </Text>
                  <Text style={styles.imagePickerTitleSecondary}>
                    First picture - is the title picture. You change the order
                    any time.
                  </Text>
                </View>
                <View style={styles.imagePicker}>
                  <ImagePicker
                    onPick={onPickImageHandler}
                    onLoading={onLoadImageHandler}
                    pickElement={
                      <Feather name="plus" size={28} color={COLORS.white} />
                    }
                    limit={12}
                  />
                </View>
              </View>
            )}
            {showImagePreview && (
              <ImagePreview files={fileList} onDelete={onDeleteImageHandler} />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { opacity: disableSubmitButton() ? 0.8 : 1 },
                ]}
                onPress={(_) => formik.handleSubmit()}
                disabled={disableSubmitButton()}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Uploading...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Upload</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 8,
  },
  titleText: {
    color: COLORS.gray8,
    fontSize: 16,
  },
  formContainer: {
    gap: 16,
  },

  imagePickerContainer: {
    width: "100%",
    gap: 8,
  },
  imagePicker: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.gray5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 999,
  },
  imagePickerContent: {
    flex: 1,
  },
  imagePickerTitlePrimary: {
    color: COLORS.gray8,
    fontWeight: "500",
    fontSize: 16,
  },
  imagePickerTitleSecondary: {
    color: COLORS.gray6,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
