import React from "react";
import { View, Text, TextInput, KeyboardType } from "react-native";

type InputFieldProps = {
  formik: any;
  name: string;
  label?: string;
  keyboardType: KeyboardType;
  placeholder: string;
  isSecureTextEntry?: boolean;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { formik, name, label, keyboardType, isSecureTextEntry, placeholder } =
    props;
  const hasError = formik.errors[`${name}`] && formik.touched[`${name}`];

  //   TODO: To define the styles for the input

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={{}}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[`${name}`]}
        keyboardType={keyboardType}
        secureTextEntry={isSecureTextEntry}
      />
      {hasError && <Text>{formik.errors[`${name}`]}</Text>}
    </View>
  );
};
