import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { advert } from "@/API/advert";
import { useGlobalSearchParams } from "expo-router";
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";
import { InputSelect } from "@/components/shared/UI/InputSelect";
import { units } from "../data/units";
import { currencies } from "../data/currencies";
import { InputField } from "@/components/shared/UI/InputField";
import { useAdvertStore } from "@/store/advert";

export const PostAdvertPrice: React.FC = () => {
  const {
    postAdvertStep,
    advertID,
    productName,
  }: { postAdvertStep: string; advertID: string; productName: string } =
    useGlobalSearchParams();

  const updateAdvertPrice = useAdvertStore((state) => state.updateAdvertPrice);
  const currentAdvert = useAdvertStore((state) => state.currentAdvert);

  const hasPrice = !!currentAdvert?.price?.amount;
  const currentAdvertID = currentAdvert?.id!;
  const amount = currentAdvert?.price?.amount!;
  const unit = currentAdvert?.price?.unit!;
  const priceCurrencyCode = JSON.parse(currentAdvert?.price?.currency!)
    ?.code as string;

  const getCurrency = (currencyCode: string) => {
    return JSON.stringify(
      currencies.find((currency) => currency.code === currencyCode)!
    );
  };

  const initialFormValues: TAdvert["postAdvertPriceInput"] = {
    advertID: hasPrice ? currentAdvertID : advertID,
    amount: hasPrice ? amount : 0,
    currency: hasPrice ? getCurrency(priceCurrencyCode) : getCurrency("UGX"),
    unit: hasPrice ? unit : "",
  };

  const advertPriceValidationSchema = yup.object().shape({
    amount: yup.number().required("Amount is required"),
    currency: yup
      .string()
      .transform((value) => value.trim())
      .required("Currency is required"),
    unit: yup
      .string()
      .transform((value) => value.trim())
      .required("Unit is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: advert.postPrice,
    onSuccess: (response: any) => {
      console.log("post advert price response:", response);

      const price = response.data as TAdvert["advertPrice"];
      updateAdvertPrice(price);

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

  const postAdvertSubmitHandler = (values: TAdvert["postAdvertPriceInput"]) => {
    values.amount = Number(values.amount);
    console.log("advert values:", values);
    mutate(values);
  };

  const currencyList = currencies.map((currency) => currency.code);

  const onSelectCurrency = (
    value: string,
    formik: FormikProps<TAdvert["postAdvertPriceInput"]>
  ) => {
    const selectedCurrency = currencies.find(
      (currency) => currency.code === value
    )!;
    formik.setFieldValue("currency", JSON.stringify(selectedCurrency));
  };

  const onSelectUnit = (
    value: string,
    formik: FormikProps<TAdvert["postAdvertPriceInput"]>
  ) => {
    formik.setFieldValue("unit", value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Select price currency, amount and unit
        </Text>
      </View>
      <Formik
        validationSchema={advertPriceValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => postAdvertSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <View style={styles.formFieldContainer}>
              <View style={styles.currencyFieldContainer}>
                <InputSelect
                  label="Currency"
                  options={currencyList}
                  initialValue="UGX"
                  onSelect={(value: string) => {
                    onSelectCurrency(value, formik);
                  }}
                />
              </View>
              <View style={styles.amountFieldContainer}>
                <InputField
                  formik={formik}
                  label="Amount"
                  name="amount"
                  keyboardType="number-pad"
                  placeholder=""
                />
              </View>
              <View style={styles.unitFieldContainer}>
                <InputSelect
                  label="Unit"
                  options={units}
                  initialValue="kg"
                  onSelect={(value: string) => {
                    onSelectUnit(value, formik);
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
                onPress={(_) => formik.handleSubmit()}
                disabled={isPending}
              >
                {isPending ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.buttonText}>Saving...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Save Price</Text>
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
  titleContainer: {
    width: "100%",
    gap: 8,
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 8,
  },
  titleText: {
    color: COLORS.gray8,
    fontSize: 16,
  },
  formContainer: {
    gap: 16,
  },
  formFieldContainer: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currencyFieldContainer: {
    width: "auto",
    minWidth: 80,
  },
  amountFieldContainer: {
    flex: 1,
  },
  unitFieldContainer: {
    width: "auto",
    minWidth: 80,
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
