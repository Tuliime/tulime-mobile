import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardType,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
  const isSecureEntry = isSecureTextEntry ? isSecureTextEntry : false;
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordField = isSecureTextEntry === true;
  const [showPassword, setShowPassword] = useState(isSecureEntry);

  const showPasswordHandler = () => {
    if (!isSecureEntry) return;
    setShowPassword(() => !showPassword);
  };

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
          style={{
            borderWidth: 2,
            borderColor: hasError
              ? COLORS.red6
              : isFocused
              ? COLORS.primary
              : COLORS.gray6,
            borderRadius: 4,
            color: COLORS.gray8,
          }}
          onChangeText={formik.handleChange(name)}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          value={formik.values[`${name}`]}
          keyboardType={keyboardType}
          secureTextEntry={showPassword}
        />
        {isPasswordField && (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 28,
              height: 28,
              position: "absolute",
              top: 8,
              right: 12,
            }}
            onPress={showPasswordHandler}
          >
            {showPassword && (
              <FontAwesome name="eye" size={24} color={COLORS.gray8} />
            )}
            {!showPassword && (
              <FontAwesome name="eye-slash" size={24} color={COLORS.gray8} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text style={{ color: COLORS.red6, fontSize: SIZES.small }}>
          {formik.errors[`${name}`]}
        </Text>
      )}
    </View>
  );
};
