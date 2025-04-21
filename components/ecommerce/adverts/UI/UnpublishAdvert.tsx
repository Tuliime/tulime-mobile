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
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";
import { useAdvertStore } from "@/store/advert";

type UnpublishAdvertProps = {
  advert: TAdvert["advert"];
};

export const UnpublishAdvert: React.FC<UnpublishAdvertProps> = (props) => {
  const initialFormValues: TAdvert["advertPublicityInput"] = {
    advertID: props.advert.id,
  };

  const updateCurrentAdvert = useAdvertStore(
    (state) => state.updateCurrentAdvert
  );

  const advertValidationSchema = yup.object().shape({});

  const { isPending, mutate } = useMutation({
    mutationFn: advert.unPublish,
    onSuccess: (response: any) => {
      console.log("unPublish advert response:", response);
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

  const unPublishAdvertSubmitHandler = (
    values: TAdvert["advertPublicityInput"]
  ) => {
    mutate(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={advertValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => unPublishAdvertSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <View style={styles.publishContentContainer}>
              <Text style={styles.publishContentText}>
                This advert is published. Un publishing will make it invisible
                among other adverts or search results on the platform.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
                onPress={(_) => formik.handleSubmit()}
                disabled={isPending}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={COLORS.white} />
                    <Text style={styles.buttonText}>Un publishing...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Un publish</Text>
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
    gap: 16,
  },
  formContainer: {
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.gray6,
    padding: 16,
  },
  publishContentContainer: {},
  publishContentText: {
    color: COLORS.gray6,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: COLORS.gray7,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
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
