import React from "react";
import { Formik } from "formik";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import { COLORS } from "@/constants";
import { search } from "@/API/search";
import { useMutation } from "@tanstack/react-query";
import { TSearch, TSearchAPI } from "@/types/search";
import { Buffer } from "buffer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type SearchFormProps = {
  parameters: string[];
  onResultUpdate: (result: TSearch["results"]) => void;
};

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const parameterListEncoding = (parameters: string[]) => {
    return Buffer.from(JSON.stringify(parameters), "utf-8").toString("base64");
  };

  const initialFormValues: TSearchAPI = {
    query: "",
    parameters: parameterListEncoding(props.parameters),
  };

  const searchValidationSchema = yup.object().shape({
    query: yup.string().required("Search input is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: search.create,
    onSuccess: (response: any) => {
      props.onResultUpdate(response.data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const searchHandler = (values: TSearchAPI) => {
    console.log("search values: ", values);
    mutate(values);
  };

  return (
    <Formik
      validationSchema={searchValidationSchema}
      initialValues={initialFormValues}
      onSubmit={(values) => searchHandler(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <View style={styles.formView}>
          <TextInput
            placeholder="Search Tulime"
            onChangeText={handleChange("query")}
            onBlur={handleBlur("query")}
            value={values.query}
            keyboardType="default"
            style={styles.input}
            placeholderTextColor={COLORS.gray6}
            multiline
          />
          <TouchableOpacity
            style={styles.button}
            onPress={(_) => handleSubmit()}
            disabled={isPending || !isValid}
          >
            {isPending ? (
              <ActivityIndicator size={24} color={COLORS.primary} />
            ) : (
              <MaterialIcons name="search" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 36,
    borderColor: COLORS.gray4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 80,
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
