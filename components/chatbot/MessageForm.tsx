import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { COLORS } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { TChatbot } from "@/types/chatbot";
import { useAuthStore } from "@/store/auth";
import { useChatbotStore } from "@/store/chatbot";
import { chatbot } from "@/API/chatbot";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width * 0.98;
const formContainerWidth = screenWidth - 2 * 16;
const inputFieldWith = formContainerWidth - 64;

export const MessageForm: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);
  const addMessageToList = useChatbotStore((state) => state.addMessage);

  const initialFormValues: TChatbot["messageInput"] = {
    userID: auth.user.id,
    message: "",
    writtenBy: "user",
    postedAt: "",
    token: auth.accessToken,
  };

  const messageValidationSchema = yup.object().shape({
    message: yup.string().required("message is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: chatbot.post,
    onSuccess: (response: any) => {
      console.log("chatbot response:", response);
      response.data.postedAt = new Date().toISOString(); //To be removed
      addMessageToList(response.data);
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

  const messageSubmitHandler = (values: TChatbot["messageInput"]) => {
    console.log("Submit handler start...");
    values.postedAt = new Date().toISOString();
    console.log("message input values:", values);
    addMessageToList(values as any);
    mutate(values);
    console.log("Submit handler end...");
  };

  // TODO: to find way better to implement clearing the form
  const makeFormValuesEmpty = (
    formik: FormikProps<TChatbot["messageInput"]>
  ) => {
    // console.log("makeFormValuesEmpty...");
    // formik.values["message"] = "";
    // formik.values["postedAt"] = "";
  };

  const formikSubmitHandler = (
    formik: FormikProps<TChatbot["messageInput"]>
  ) => {
    formik.handleSubmit();
    setTimeout(() => {
      makeFormValuesEmpty(formik);
    }, 200);
  };

  const disableSubmitButton = (
    formik: FormikProps<TChatbot["messageInput"]>
  ): boolean => {
    const hasErrors = !!formik.errors["message"];

    if (hasErrors) return hasErrors;
    return isPending;
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={messageValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => messageSubmitHandler(values)}
      >
        {(formik) => (
          <View style={[styles.formContainer, {}]}>
            <TextInput
              placeholder={"Ask Tulime Chatbot"}
              style={styles.input}
              onChangeText={formik.handleChange("message")}
              onBlur={formik.handleBlur("message")}
              value={formik.values["message"]}
              keyboardType={"default"}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { opacity: disableSubmitButton(formik) ? 0.75 : 1 },
              ]}
              onPress={(_) => {
                // formik.handleSubmit();
                //   makeFormValuesEmpty(formik);
                formikSubmitHandler(formik);
              }}
              disabled={disableSubmitButton(formik)}
            >
              {isPending ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              ) : (
                <Ionicons name="send" size={20} color={COLORS.white} />
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: COLORS.gray5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  formContainer: {
    // width: "100%",
    // width: formContainerWidth,
    backgroundColor: COLORS.gray4,
    height: 56,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingRight: 8,
    gap: 4,
  },
  input: {
    // TODO: To input field height adjust with the number of words in
    flex: 1,
    width: inputFieldWith,
    borderWidth: 0,
    borderColor: COLORS.gray6,
    borderRadius: 4,
    color: COLORS.gray8,
    outline: "none",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 1000,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
