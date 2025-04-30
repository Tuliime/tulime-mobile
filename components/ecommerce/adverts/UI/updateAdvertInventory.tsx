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
import { InputField } from "@/components/shared/UI/InputField";
import { useAdvertStore } from "@/store/advert";

type updateAdvertInventoryProps = {
  advert: TAdvert["advert"];
};

export const UpdateAdvertInventory: React.FC<updateAdvertInventoryProps> = (
  props
) => {
  const initialFormValues: TAdvert["updateAdvertInventoryInput"] = {
    advertID: props.advert.id,
    advertInventoryID: props.advert.inventory?.id!,
    quantity: String(props.advert.inventory?.quantity || "") as any,
    unit: props.advert.inventory?.unit!,
  };

  const updateAdvertInventory = useAdvertStore(
    (state) => state.updateAdvertInventory
  );

  const advertPriceValidationSchema = yup.object().shape({
    quantity: yup
      .string()
      .transform((value) => value.trim())
      .required("Quantity is required"),
    unit: yup
      .string()
      .transform((value) => value.trim())
      .required("Unit is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: advert.updateInventory,
    onSuccess: (response: any) => {
      console.log("update advert inventory response:", response);
      updateAdvertInventory(response.data);
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

  const postAdvertSubmitHandler = (
    values: TAdvert["updateAdvertInventoryInput"]
  ) => {
    console.log("advert values:", values);
    mutate(values);
  };

  const onSelectUnit = (
    value: string,
    formik: FormikProps<TAdvert["updateAdvertInventoryInput"]>
  ) => {
    formik.setFieldValue("unit", value);
  };

  const advertInventoryUnit = props.advert.inventory?.unit ?? "kg";

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Update Inventory</Text>
      </View>
      <View>
        <Text style={styles.titleSecondaryText}>
          Inventory(product quantity available in stock)
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
              <View style={styles.quantityFieldContainer}>
                <InputField
                  formik={formik}
                  label="Quantity"
                  name="quantity"
                  keyboardType="number-pad"
                  placeholder=""
                />
              </View>
              <View style={styles.unitFieldContainer}>
                <InputSelect
                  label="Unit"
                  options={units}
                  initialValue={advertInventoryUnit}
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
  titleSecondaryText: {
    color: COLORS.gray6,
    fontSize: 14,
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
  quantityFieldContainer: {
    flex: 1,
  },
  unitFieldContainer: {
    width: "auto",
    minWidth: 80,
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
