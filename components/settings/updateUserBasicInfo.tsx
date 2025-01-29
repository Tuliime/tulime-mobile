import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { InputField } from "@/components/shared/UI/InputField";
import { Formik } from "formik";
import { COLORS } from "@/constants";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/API/auth";
import { TAuth } from "@/types/auth";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/auth";

export const UpdateUserBasicInfo: React.FC = () => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const authData = useAuthStore((state) => state.auth);

  const initialFormValues: TAuth["updateUserInput"] = {
    name: authData.user.name,
    telNumber: authData.user.telNumber.toString(),
    userID: authData.user.id,
    token: authData.accessToken,
  };

  const updateUserValidationSchema = yup.object().shape({
    name: yup
      .string()
      .transform((value) => value.trim())
      .required("Username is required"),
    telNumber: yup
      .string()
      .transform((value) => value.trim())
      .matches(
        /^2567\d{8}$/,
        "Telephone number must start with '2567' followed by 8 digits"
      ),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.updateUser,
    onSuccess: (response: any) => {
      console.log("update user response:", response);
      updateUser(response.data);
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

  const updateHandler = (values: TAuth["updateUserInput"]) => {
    console.log("user update values:", values);
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Basic Information</Text>
      <Formik
        validationSchema={updateUserValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => updateHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <InputField
              formik={formik}
              label="Username"
              name="name"
              keyboardType="default"
              placeholder=""
            />
            <InputField
              formik={formik}
              label="Telephone number"
              name="telNumber"
              keyboardType="default"
              placeholder=""
            />
            <TouchableOpacity
              style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
              onPress={(_) => formik.handleSubmit()}
              disabled={isPending}
            >
              {isPending ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.white} />
                  <Text style={styles.buttonText}>Saving...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  Heading: {
    fontSize: 20,
    color: COLORS.gray8,
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    gap: 8,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
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
