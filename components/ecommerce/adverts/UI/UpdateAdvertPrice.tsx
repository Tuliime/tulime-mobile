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
import { TAdvert } from "@/types/advert";
import Toast from "react-native-toast-message";
import { InputSelect } from "@/components/shared/UI/InputSelect";
import { units } from "../data/units";
import { currencies } from "../data/currencies";
import { InputField } from "@/components/shared/UI/InputField";
import { isJSONString } from "@/utils/isJsonStringified";
import { useAdvertStore } from "@/store/advert";

type UpdateAdvertPriceProps = {
  advert: TAdvert["advert"];
};

export const UpdateAdvertPrice: React.FC<UpdateAdvertPriceProps> = (props) => {
  console.log("advert: ", props.advert);
  const initialFormValues: TAdvert["updateAdvertPriceInput"] = {
    advertID: props.advert.id,
    advertPriceID: props.advert.price?.id!,
    amount: String(props.advert.price?.amount || "") as any,
    currency: props.advert.price?.currency!,
    unit: props.advert.price?.unit!,
  };

  const updateAdvertPrice = useAdvertStore((state) => state.updateAdvertPrice);

  const advertPriceValidationSchema = yup.object().shape({
    amount: yup
      .string()
      .transform((value) => value.trim())
      .required("Amount is required"),
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
    mutationFn: advert.updatePrice,
    onSuccess: (response: any) => {
      console.log("update advert price response:", response);
      updateAdvertPrice(response.data);
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

  const updateAdvertPriceSubmitHandler = (
    values: TAdvert["updateAdvertPriceInput"]
  ) => {
    values.amount = Number(values.amount);
    console.log("advert values:", values);
    mutate(values);
  };

  const currencyList = currencies.map((currency) => currency.code);

  const advertPriceCurrency = props.advert.price?.currency!;
  const advertPriceCurrencyCode = isJSONString(advertPriceCurrency)
    ? JSON.parse(advertPriceCurrency)?.code
    : "UGX";

  const advertPriceUnit = props.advert.price?.unit ?? "kg";

  const onSelectCurrency = (
    value: string,
    formik: FormikProps<TAdvert["updateAdvertPriceInput"]>
  ) => {
    const selectedCurrency = currencies.find(
      (currency) => currency.code === value
    )!;
    formik.setFieldValue("currency", JSON.stringify(selectedCurrency));
  };

  const onSelectUnit = (
    value: string,
    formik: FormikProps<TAdvert["updateAdvertPriceInput"]>
  ) => {
    formik.setFieldValue("unit", value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Update price currency, amount and unit
        </Text>
      </View>
      <Formik
        validationSchema={advertPriceValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => updateAdvertPriceSubmitHandler(values)}
      >
        {(formik) => (
          <View style={styles.formContainer}>
            <View style={styles.formFieldContainer}>
              <View style={styles.currencyFieldContainer}>
                <InputSelect
                  label="Currency"
                  options={currencyList}
                  initialValue={advertPriceCurrencyCode}
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
                  initialValue={advertPriceUnit}
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
                    <ActivityIndicator size="small" color={COLORS.white} />
                    <Text style={styles.buttonText}>Saving...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Save</Text>
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
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
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
