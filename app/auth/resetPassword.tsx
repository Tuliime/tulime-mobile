import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";
import { InputField } from "@/components/shared/UI/InputField";
import { Formik } from "formik";
import { COLORS } from "@/constants";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/API/auth";
import { TAuth } from "@/types/auth";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

const ResetPassword: React.FC = () => {
  // TODO: To get OTP from query params 'OTP'
  const initialFormValues: TAuth["resetPassword"] = {
    password: "",
    confirmPassword: "",
    OTP: "186141",
  };

  const signUpValidationSchema = yup.object().shape({
    password: yup
      .string()
      .transform((value) => value.trim())
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and include at least one letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: yup.string().required("Password is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.resetPassword,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("reset password response:", response);
      // TODO: Update global state (e.g., Zustand)
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

  // TODO: To validate matching passwords here

  const signUpHandler = (values: TAuth["resetPassword"]) => {
    console.log("Reset password values:", values);
    mutate(values);
  };

  return (
    <SecondaryLayout title="Reset Password">
      <View style={styles.container}>
        <Text style={styles.headerText}>Reset Your Password</Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={initialFormValues}
          onSubmit={(values) => signUpHandler(values)}
        >
          {(formik) => (
            <View style={styles.formContainer}>
              <InputField
                formik={formik}
                label="New Password"
                name="password"
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
                {!isPending ? (
                  <Text style={styles.buttonText}>Reset</Text>
                ) : (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Resetting...</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Link href="/auth/signin">
          <Text style={styles.linkText}>Remember Password? Log in </Text>
        </Link>
      </View>
    </SecondaryLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    color: COLORS.gray8,
    textAlign: "center",
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
  linkText: {
    fontSize: 14,
    color: COLORS.blue7,
    marginTop: 12,
  },
});

export default ResetPassword;
