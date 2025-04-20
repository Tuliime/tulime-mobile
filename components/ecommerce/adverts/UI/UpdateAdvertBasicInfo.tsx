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
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";
import { useAdvertStore } from "@/store/advert";

{
  /*TODO: to make fields productName and productDescription ai aided  */
}

type UpdateAdvertBasicInfo = {
  advert: TAdvert["advert"];
};

export const UpdateAdvertBasicInfo: React.FC<UpdateAdvertBasicInfo> = (
  props
) => {
  const initialFormValues: TAdvert["updateAdvertInput"] = {
    advertID: props.advert.id,
    storeID: props.advert.storeID,
    userID: props.advert.userID,
    productName: props.advert.productName,
    productDescription: props.advert.productDescription,
  };

  const updateCurrentAdvert = useAdvertStore(
    (state) => state.updateCurrentAdvert
  );

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
    mutationFn: advert.update,
    onSuccess: (response: any) => {
      console.log("update advert response:", response);
      updateCurrentAdvert(response.data);
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

  const updateAdvertSubmitHandler = (values: TAdvert["updateAdvertInput"]) => {
    console.log("advert values:", values);
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Basic Information</Text>
      </View>
      <Formik
        validationSchema={advertValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => updateAdvertSubmitHandler(values)}
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
                    <ActivityIndicator size="small" color={COLORS.white} />
                    <Text style={styles.buttonText}>Saving...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>save</Text>
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
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
