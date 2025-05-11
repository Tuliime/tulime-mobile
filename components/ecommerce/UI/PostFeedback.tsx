import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { InputSelect } from "../../shared/UI/InputSelect";
import { COLORS } from "@/constants/theme";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { ImagePicker } from "../../shared/UI/ImagePicker";
import { Asset } from "@/types/assets";
import { TFeedback } from "@/types/feedback";
import Feather from "@expo/vector-icons/Feather";
import { ImagePreview } from "../../shared/UI/ImagePreview";
import Entypo from "@expo/vector-icons/Entypo";

export const PostFeedback: React.FC = () => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [fileList, setFileList] = useState<Asset["file"][]>([]);
  const showImagePreview: boolean = !!fileList[0]?.name;

  const initialFormValues: TFeedback["feedbackInput"] = {
    title: "",
    description: "",
    files: [],
  };

  const { isPending, mutate } = useMutation({
    // mutationFn: feedback.post,
    onSuccess: (response: any) => {
      console.log("feedback response:", response);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const onPickImageHandler = (files: Asset["file"][]) => {
    setFileList(() => files);
  };

  const onLoadImageHandler = (isLoading: boolean) => {
    setIsLoadingFile(() => isLoading);
  };

  const onDeleteImageHandler = (inputIndex: number) => {
    console.log("inputIndex to be removed: ", inputIndex);
    setFileList(() => fileList.filter((_, index) => index !== inputIndex));
  };

  const onChangeTextHandler = (
    formik: FormikProps<TFeedback["feedbackInput"]>,
    description: string
  ) => {
    formik.setFieldValue("description", description);
  };

  const feedbackValidationSchema = yup.object().shape({
    description: yup.string().required("description is required"),
  });

  const feedbackSubmitHandler = (values: any) => {};

  const feedbackTitleOptions = [
    "Successful purchase",
    "The deal failed",
    "You didn't come to deal",
    "Can't reach the seller",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cautionContainer}>
        <Entypo name="chat" size={40} color={COLORS.gray8} />
        <Text style={styles.cautionText}>
          Your feedback is very important for the seller review. Please leave
          the honest review to help other buyers and the seller in customer
          attraction.
        </Text>
      </View>
      <Formik
        validationSchema={feedbackValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => feedbackSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <View style={styles.experienceContainer}>
              <Text style={styles.experienceQtnText}>
                How was your experience?
              </Text>
              <View style={styles.experienceBtnContainer}>
                <TouchableOpacity
                  style={[
                    styles.experienceBtn,
                    {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    },
                  ]}
                >
                  <Entypo name="emoji-happy" size={20} color={COLORS.white} />
                  <Text style={styles.experienceBtnText}>Positive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.experienceBtn,
                    { borderColor: COLORS.yellow7 },
                  ]}
                >
                  <Entypo
                    name="emoji-neutral"
                    size={20}
                    color={COLORS.yellow7}
                  />
                  <Text
                    style={[
                      styles.experienceBtnText,
                      { color: COLORS.yellow7 },
                    ]}
                  >
                    Neutral
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.experienceBtn, { borderColor: COLORS.red7 }]}
                >
                  <Entypo name="emoji-sad" size={20} color={COLORS.red7} />
                  <Text
                    style={[styles.experienceBtnText, { color: COLORS.red7 }]}
                  >
                    Negative
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <InputSelect
              options={feedbackTitleOptions}
              initialValue="How was it"
              onSelect={(value: string) => {
                formik.setFieldValue("title", value);
              }}
            />
            <TextInput
              placeholder={"Describe your issue in detail"}
              style={styles.input}
              onChangeText={(text) => {
                onChangeTextHandler(formik, text);
              }}
              onBlur={formik.handleBlur("description")}
              value={formik.values["description"]}
              keyboardType={"default"}
              multiline
            />
            {!showImagePreview && (
              <View style={styles.imagePickerContainer}>
                <View style={styles.imagePicker}>
                  <ImagePicker
                    onPick={onPickImageHandler}
                    onLoading={onLoadImageHandler}
                    pickElement={
                      <Feather name="plus" size={28} color={COLORS.white} />
                    }
                    limit={5}
                  />
                </View>
                <View style={styles.imagePickerContent}>
                  <Text style={styles.imagePickerTitlePrimary}>
                    Attach a photo (optional)
                  </Text>
                  <Text style={styles.imagePickerTitleSecondary}>
                    You can upload up to 5 images
                  </Text>
                </View>
              </View>
            )}
            {showImagePreview && (
              <ImagePreview files={fileList} onDelete={onDeleteImageHandler} />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
                onPress={(_) => formik.handleSubmit()}
                disabled={isPending}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Sending feedback...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Send Feedback</Text>
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
  cautionContainer: {
    width: "100%",
    gap: 8,
    alignItems: "center",
  },
  cautionText: {
    color: COLORS.gray8,
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
