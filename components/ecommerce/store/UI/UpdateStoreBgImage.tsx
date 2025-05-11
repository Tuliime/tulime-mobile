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
import Toast from "react-native-toast-message";
import { TEcommerceStore } from "@/types/ecommerceStore";
import { store } from "@/API/store";
import { useEcommerceStore } from "@/store/ecommerceStore";

type UpdateStoreBgImageProps = {
  store: TEcommerceStore["store"];
};

export const UpdateStoreBgImage: React.FC<UpdateStoreBgImageProps> = (
  props
) => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const initialFormValues: { file: Asset["file"] } = {
    file: {
      name: "",
      mimeType: "",
      base64: "",
      uri: "",
    },
  };
  const [file, setFile] = useState<Asset["file"]>(initialFormValues.file);

  const showImagePreview: boolean = !!file?.name;
  const hasFile: boolean = !!file?.name;
  const hasBgImage: boolean = !!props.store.backgroundImageUrl;

  const updateCurrentStore = useEcommerceStore(
    (state) => state.updateCurrentStore
  );

  const { isPending, mutate } = useMutation({
    mutationFn: store.updateBgImage,
    onSuccess: (response: any) => {
      console.log("updated store Image response:", response);
      updateCurrentStore(response.data);
      setFile(() => initialFormValues.file);

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
    setFile(() => files[0]);
  };

  const onLoadImageHandler = (isLoading: boolean) => {
    setIsLoadingFile(() => isLoading);
  };

  const onDeleteImageHandler = (inputIndex: number) => {
    setFile(() => initialFormValues.file);
  };

  const advertImageValidationSchema = yup.object().shape({});

  const storeImageSubmitHandler = (values: { file: Asset["file"] }) => {
    const formData = new FormData();

    formData.append(
      "file",
      {
        uri: file.uri,
        name: "media",
        type: file.mimeType,
      } as any,
      file.name
    );

    mutate({
      storeID: props.store.id,
      formData: formData,
    });
  };

  const disableSubmitButton = (): boolean => {
    if (!hasFile) return true;
    return isPending;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {hasBgImage ? "Update background Image" : "Add background Image"}{" "}
        </Text>
      </View>
      {hasBgImage && (
        <View style={""}>
          <ImagePreview
            files={[]}
            urls={[props.store.backgroundImageUrl]}
            onDelete={(_) => {}}
            canDelete={false}
            isLocalImage={false}
          />
        </View>
      )}
      <Formik
        validationSchema={advertImageValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => storeImageSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            {!showImagePreview && (
              <View style={styles.imagePickerContainer}>
                <View style={styles.imagePickerContent}>
                  <Text style={styles.imagePickerTitleSecondary}>
                    Select Image from Gallery
                  </Text>
                </View>
                <View style={styles.imagePicker}>
                  <ImagePicker
                    onPick={onPickImageHandler}
                    onLoading={onLoadImageHandler}
                    pickElement={
                      <Feather name="plus" size={28} color={COLORS.white} />
                    }
                    multiple={false}
                  />
                </View>
              </View>
            )}
            {showImagePreview && (
              <ImagePreview files={[file]} onDelete={onDeleteImageHandler} />
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
    gap: 16,
    // backgroundColor: "lightblue",
  },
  titleContainer: {
    width: "100%",
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
