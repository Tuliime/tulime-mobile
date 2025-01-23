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

const forgotPassword: React.FC = () => {
  const initialFormValues: TAuth["forgotPassword"] = {
    telNumber: "",
  };

  const forgotPasswordValidationSchema = yup.object().shape({
    telNumber: yup
      .string()
      .transform((value) => value.trim())
      .matches(
        /^2567\d{8}$/,
        "Telephone number must start with '2567' followed by 8 digits"
      )
      .required("Telephone number is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.forgotPassword,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("forgot Password response:", response);
      // TODO: Update global state (e.g., Zustand)
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const forgotPasswordHandler = (values: TAuth["forgotPassword"]) => {
    console.log("forgot password values:", values);
    mutate(values);
  };

  return (
    <SecondaryLayout title="Forgot Password">
      <View style={styles.container}>
        <Text style={styles.headerText}>Reset Your Account Password</Text>
        <Formik
          validationSchema={forgotPasswordValidationSchema}
          initialValues={initialFormValues}
          onSubmit={(values) => forgotPasswordHandler(values)}
        >
          {(formik) => (
            <View style={styles.formContainer}>
              <View style={styles.formHeadingContainer}>
                <Text style={styles.formHeadingText}>
                  Please provide telephone number associated with your account
                </Text>
              </View>
              <InputField
                formik={formik}
                label="Telephone number"
                name="telNumber"
                keyboardType="numeric"
                placeholder=""
              />
              <TouchableOpacity
                style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
                onPress={(_) => formik.handleSubmit()}
                disabled={isPending}
              >
                {!isPending ? (
                  <Text style={styles.buttonText}>Submit</Text>
                ) : (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Submitting...</Text>
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
  formHeadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  formHeadingText: {
    textAlign: "center",
    fontSize: 16,
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

export default forgotPassword;
