import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardType,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { COLORS, SIZES } from "@/constants";

type InputTextAreaProps = {
  formik: any;
  name: string;
  label?: string;
  keyboardType: KeyboardType;
  placeholder: string;
  inputStyles?: StyleProp<TextStyle>;
};

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  const { formik, name, label, keyboardType, placeholder, inputStyles } = props;
  const hasError = formik.errors[`${name}`] && formik.touched[`${name}`];
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandler = (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(() => true);
  };

  const onBlurHandler = (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(() => false);
    formik.handleBlur(name);
  };

  return (
    <View style={{ gap: 8 }}>
      {label && (
        <Text
          style={{
            color: hasError ? COLORS.red6 : COLORS.gray6,
            fontSize: SIZES.medium,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder={placeholder}
          style={[
            styles.input,
            {
              borderColor: hasError
                ? COLORS.red6
                : isFocused
                ? COLORS.primary
                : COLORS.gray6,
            },
            inputStyles,
          ]}
          onChangeText={formik.handleChange(name)}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          value={formik.values[`${name}`]}
          keyboardType={keyboardType}
        />
      </View>

      {hasError && (
        <Text style={{ color: COLORS.red6, fontSize: SIZES.small }}>
          {formik.errors[`${name}`]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
  input: {
    height: 120,
    width: "100%",
    borderWidth: 2,
    borderColor: COLORS.gray6,
    borderRadius: 8,
    color: COLORS.gray8,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
