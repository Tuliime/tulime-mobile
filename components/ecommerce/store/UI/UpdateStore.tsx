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
import { InputField } from "@/components/shared/UI/InputField";
import { InputTextArea } from "@/components/shared/UI/InputTextArea";
import Toast from "react-native-toast-message";
import { TEcommerceStore } from "@/types/ecommerceStore";
import { store } from "@/API/store";
import { useEcommerceStore } from "@/store/ecommerceStore";

{
  /*TODO: to make fields productName and productDescription ai aided  */
}

type UpdateStore = {
  store: TEcommerceStore["store"];
};

export const UpdateStore: React.FC<UpdateStore> = (props) => {
  const initialFormValues: TEcommerceStore["updateStoreInput"] = {
    id: props.store.id,
    userID: props.store.userID,
    name: props.store.name,
    description: props.store.description,
    email: props.store.email,
    website: props.store.website,
    location: props.store.location,
  };

  const updateCurrentStore = useEcommerceStore(
    (state) => state.updateCurrentStore
  );

  const advertValidationSchema = yup.object().shape({
    name: yup
      .string()
      .transform((value) => value.trim())
      .required("Name is required"),
    description: yup.string().transform((value) => value.trim()),
    email: yup
      .string()
      .transform((value) => value.trim())
      .email("Invalid email format"),
    website: yup.string().transform((value) => value.trim()),
    location: yup.string().transform((value) => value.trim()),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: store.update,
    onSuccess: (response: any) => {
      console.log("update advert response:", response);
      updateCurrentStore(response.data);
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

  const updateStoreSubmitHandler = (
    values: TEcommerceStore["updateStoreInput"]
  ) => {
    console.log("store values:", values);
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={advertValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => updateStoreSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <InputField
              formik={formik}
              label="Name"
              name="name"
              keyboardType="default"
              placeholder=""
            />
            <InputTextArea
              formik={formik}
              label="Description (optional)"
              name="productDescription"
              keyboardType="default"
              placeholder="Description helps buyers know what you sell"
            />
            <InputField
              formik={formik}
              label="Email (optional)"
              name="email"
              keyboardType="default"
              placeholder=""
            />
            <InputField
              formik={formik}
              label="Website (optional)"
              name="website"
              keyboardType="default"
              placeholder=""
            />
            <InputField
              formik={formik}
              label="Location"
              name="location"
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
    minHeight: 400,
  },
  formContainer: {
    gap: 16,
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
    width: "100%",
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
