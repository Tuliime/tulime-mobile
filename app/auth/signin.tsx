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

const SignIn: React.FC = () => {
  const initialFormValues: TAuth["signin"] = {
    telNumber: "",
    password: "",
  };

  const signInValidationSchema = yup.object().shape({
    telNumber: yup.string().required("telNumber is required"),
    password: yup.string().required("Password is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.signIn,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("Signup response:", response);
      // TODO: Update global state (e.g., Zustand)
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const signInHandler = (values: TAuth["signin"]) => {
    console.log("Signin values:", values);
    mutate(values);
  };

  return (
    <SecondaryLayout title="Log in">
      <View style={styles.container}>
        <Text style={styles.headerText}>Log into your account</Text>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={initialFormValues}
          onSubmit={(values) => signInHandler(values)}
        >
          {(formik) => (
            <View style={styles.formContainer}>
              <InputField
                formik={formik}
                label="Telephone number"
                name="telNumber"
                keyboardType="numeric"
                placeholder=""
              />
              <InputField
                formik={formik}
                label="Password"
                name="password"
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
                  <Text style={styles.buttonText}>Log In</Text>
                ) : (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Logging in...</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Link href="/auth/forgotPassword">
          <Text style={styles.linkText}>Forgot password? Reset</Text>
        </Link>
        <Link href="/auth/signup">
          <Text style={styles.linkText}>Don’t have an account? Register</Text>
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

export default SignIn;
