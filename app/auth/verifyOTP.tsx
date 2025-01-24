import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";
import { COLORS } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/API/auth";
import { Link } from "expo-router";

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { isPending, mutate } = useMutation({
    mutationFn: auth.verifyOTP,
    onSuccess: (response: any) => {
      console.log("OTP verification response:", response);
      // TODO: Update global state (e.g., Zustand)
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const handleInputChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      mutate({ otp: otpCode });
    } else {
      console.log("Invalid OTP. Must be 6 digits.");
    }
  };

  return (
    <SecondaryLayout title="Verify Reset Code">
      <View style={styles.container}>
        <Text style={styles.headerText}>Verify Reset Password Code</Text>
        <View style={styles.formContainer}>
          <Text style={styles.instructionsText}>
            Please provide the reset code sent to your number
          </Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, { opacity: isPending ? 0.8 : 1 }]}
            onPress={handleSubmit}
            disabled={isPending}
          >
            {!isPending ? (
              <Text style={styles.buttonText}>Verify</Text>
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.white} />
                <Text style={styles.buttonText}>Verifying...</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Link href="/auth/forgotPassword">
          <Text style={styles.linkText}>Didn't receive opt? Send</Text>
        </Link>
        <Link href="/auth/signin">
          <Text style={styles.linkText}>Remember Password? Log in</Text>
        </Link>
      </View>
    </SecondaryLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
    borderRadius: 8,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    color: COLORS.gray8,
    textAlign: "center",
  },
  instructionsText: {
    fontSize: 16,
    color: COLORS.gray6,
    textAlign: "center",
  },
  otpContainer: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray4,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 4,
    color: COLORS.gray8,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    width: "100%",
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
  linkText: {
    fontSize: 14,
    color: COLORS.blue7,
    marginTop: 12,
  },
});

export default VerifyOTP;
