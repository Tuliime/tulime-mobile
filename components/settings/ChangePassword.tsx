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
import { router } from "expo-router";

export const ChangePassword: React.FC = () => {
  const deleteAuth = useAuthStore((state) => state.deleteAuth);
  const authData = useAuthStore((state) => state.auth);

  const initialFormValues: TAuth["changePasswordInput"] = {
    userID: authData.user.id,
    token: authData.accessToken,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const changePasswordValidationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .transform((value) => value.trim())
      .required("Current password is required"),
    newPassword: yup
      .string()
      .transform((value) => value.trim())
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and include at least one letter, one number, and one special character"
      )
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .transform((value) => value.trim())
      .oneOf([yup.ref("newPassword")], "Must be similar to New password")
      .required("Confirm password is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.changePassword,
    onSuccess: (response: any) => {
      deleteAuth();
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: response.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
      router.push("/auth/signin");
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

  const changePasswordHandler = (values: TAuth["changePasswordInput"]) => {
    console.log("change password values:", values);
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Change Password</Text>
      <Formik
        validationSchema={changePasswordValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => changePasswordHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <InputField
              formik={formik}
              label="Current Password"
              name="currentPassword"
              keyboardType="default"
              isSecureTextEntry
              placeholder=""
            />
            <InputField
              formik={formik}
              label="New Password"
              name="newPassword"
              keyboardType="default"
              isSecureTextEntry
              placeholder=""
            />
            <InputField
              formik={formik}
              label="Confirm Password"
              name="confirmPassword"
              keyboardType="default"
              isSecureTextEntry
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
                  <Text style={styles.buttonText}>Submitting...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
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
