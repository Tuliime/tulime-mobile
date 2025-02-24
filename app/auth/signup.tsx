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
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/auth";

const SignUp: React.FC = () => {
  const updateAuth = useAuthStore((state) => state.updateAuth);

  const initialFormValues: TAuth["signup"] = {
    name: "",
    telNumber: "",
    password: "",
  };

  const signUpValidationSchema = yup.object().shape({
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
      )
      .required("Telephone number is required"),
    password: yup
      .string()
      .transform((value) => value.trim())
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and include at least one letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: auth.signup,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("Signup response:", response);
      updateAuth(response);
      router.push("/home");
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

  const signUpHandler = (values: TAuth["signup"]) => {
    console.log("Signup values:", values);
    mutate(values);
  };

  return (
    <SecondaryLayout title="Register">
      <View style={styles.container}>
        <Text style={styles.headerText}>Create Tulime Account</Text>

        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={initialFormValues}
          onSubmit={(values) => signUpHandler(values)}
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
                  <Text style={styles.buttonText}>Create</Text>
                ) : (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Creating...</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Link href="/auth/signin">
          <Text style={styles.linkText}>Already have an account? Log in</Text>
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
    borderRadius: 8,
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

export default SignUp;
