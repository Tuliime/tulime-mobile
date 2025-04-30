import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { advert } from "@/API/advert";
import { InputField } from "@/components/shared/UI/InputField";
import { InputTextArea } from "@/components/shared/UI/InputTextArea";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";
import { useAdvertStore } from "@/store/advert";

{
  /*TODO: to make fields productName and productDescription ai aided  */
}

export const PostAdvert: React.FC = () => {
  const userID = useAuthStore((state) => state.auth.user.id);
  const updateCurrentAdvert = useAdvertStore(
    (state) => state.updateCurrentAdvert
  );

  const currentAdvert = useAdvertStore((state) => state.currentAdvert);
  const hasAdvertInfo = !!currentAdvert?.id;
  const storeID = currentAdvert?.storeID!;
  const productName = currentAdvert?.productName!;
  const productDescription = currentAdvert?.productDescription!;

  const initialFormValues: TAdvert["postAdvertInput"] = {
    storeID: hasAdvertInfo ? storeID : "",
    userID: userID,
    productName: hasAdvertInfo ? productName : "",
    productDescription: hasAdvertInfo ? productDescription : "",
  };

  const advertValidationSchema = yup.object().shape({
    productName: yup
      .string()
      .transform((value) => value.trim())
      .required("Product name is required"),
    productDescription: yup
      .string()
      .transform((value) => value.trim())
      .required("Product description is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: advert.post,
    onSuccess: (response: any) => {
      console.log("post advert response:", response);
      const newAdvert = response.data as TAdvert["advert"];

      router.setParams({
        postAdvertStep: 1,
        advertID: newAdvert.id,
        productName: newAdvert.productName,
      });

      updateCurrentAdvert(response.data);

      router.push(
        `/ecommerce/adverts/new?postAdvertStep=${2}&advertID=${
          newAdvert.id
        }&productName=${newAdvert.productName}`
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

  const postAdvertSubmitHandler = (values: TAdvert["postAdvertInput"]) => {
    console.log("advert values:", values);
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Post Ad</Text>
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
              label="Product name"
              name="productName"
              keyboardType="default"
              placeholder=""
            />
            <InputTextArea
              formik={formik}
              label="Product description"
              name="productDescription"
              keyboardType="default"
              placeholder="Describe the product in detail to help buyers understand it better"
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
