import React, { useEffect } from "react";
import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";
import * as yup from "yup";
import { COLORS } from "@/constants";
import { search } from "@/API/search";
import { useMutation } from "@tanstack/react-query";
import { useSearchStore } from "@/store/search";
import { TSearchAPI } from "@/types/search";

export const SearchForm: React.FC = () => {
  const updateIsSearching = useSearchStore((state) => state.updateIsSearching);
  const updateSearchResults = useSearchStore((state) => state.updateResults);

  const initialFormValues: TSearchAPI = {
    query: "",
  };
  const searchValidationSchema = yup.object().shape({
    query: yup.string().required("Search input is required"),
  });
  // TODO: To update the search results in the global state(Zustand)
  // TODO: To add search query in the url

  const { isPending, mutate } = useMutation({
    mutationFn: search.create,
    onSuccess: (response: any) => {
      console.log("search response", response);
      updateSearchResults(response.data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const searchHandler = (values: TSearchAPI) => {
    console.log("search values: ", values);
    mutate(values);
  };

  useEffect(() => {
    updateIsSearching(isPending);
  }, [isPending]);

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
        <View style={{ flex: 1, marginLeft: -4 }}>
          <TextInput
            placeholder="Search in Tulime"
            onChangeText={handleChange("query")}
            onBlur={handleBlur("query")}
            value={values.query}
            keyboardType="default"
            style={{}}
            placeholderTextColor={COLORS.gray6}
          />
          <Button
            onPress={(event: any) => handleSubmit()}
            title="Search"
            disabled={!isValid}
          />
        </View>
      )}
    </Formik>
  );
};
