import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { advert } from "@/API/advert";
import { InputField } from "@/components/shared/UI/InputField";
import { TEcommerceStore } from "@/types/ecommerceStore";
import { useAuthStore } from "@/store/auth";
import { router, useGlobalSearchParams } from "expo-router";
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";

export const PostAdvertPriceQuantityDelivery: React.FC = () => {
  // TO have separate forms for price, quantity and delivery
  const {
    postAdvertStep,
    advertID,
    productName,
    advertImage,
  }: {
    postAdvertStep: string;
    advertID: string;
    productName: string;
    advertImage: string;
  } = useGlobalSearchParams();

  const initialFormValues: any = {
    advertID: advertID,
    productPrice: "",
  };

  const advertValidationSchema = yup.object().shape({
    productName: yup
      .string()
      .transform((value) => value.trim())
      .required("Product name is required"),
  });

  const navigateToAdDetails = () => {
    router.push(`/ecommerce/adverts/${advertID}`);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: advert.post,
    onSuccess: (response: any) => {
      console.log("post advert response:", response);

      router.push(`/ecommerce/adverts/${advertID}`);

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

  const postAdvertSubmitHandler = (
    values: TEcommerceStore["postStoreInput"]
  ) => {
    // console.log("advert values:", values);
    // mutate(values);
    navigateToAdDetails();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {/* <Text style={styles.titleText}>Product: {productName}</Text> */}
        <Image
          source={{ uri: advertImage }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.titleText}>{productName}</Text>
      </View>
      <Formik
        validationSchema={advertValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => postAdvertSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <InputField
              formik={formik}
              label="Product Price"
              name="productName"
              keyboardType="default"
              placeholder=""
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
                onPress={(_) => formik.handleSubmit()}
                disabled={isPending}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Saving info...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Next</Text>
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
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 8,
  },
  titleText: {
    color: COLORS.gray8,
    fontSize: 16,
  },
  image: {
    borderRadius: 8,
    width: 40,
    height: 40,
    // aspectRatio: "4/3",
    objectFit: "fill",
    backgroundColor: COLORS.gray6,
  },
  experienceContainer: {
    gap: 8,
  },
  experienceQtnText: {
    color: COLORS.gray8,
    fontSize: 20,
  },
  experienceBtnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  experienceBtn: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    borderWidth: 1,
    borderRadius: 8,
  },
  experienceBtnText: {
    fontWeight: 500,
    color: COLORS.white,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    height: 120,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray6,
    borderRadius: 8,
    color: COLORS.gray8,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imagePickerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
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
