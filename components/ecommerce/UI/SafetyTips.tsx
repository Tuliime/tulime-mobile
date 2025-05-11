import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import Entypo from "@expo/vector-icons/Entypo";

export const SafetyTips = () => {
  return (
    <View style={styles.SafetyTipsContainer}>
      <Text style={styles.SafetyTipsTitle}>Safety Tips</Text>
      <View style={styles.SafetyTipsContentContainer}>
        <View style={styles.SafetyTipBullet}>
          <Entypo
            name="dot-single"
            size={24}
            color={COLORS.gray7}
            style={styles.dotIcon}
          />
          <Text style={styles.SafetyTipText}>
            Never make upfront payments, even for delivery.
          </Text>
        </View>
        <View style={styles.SafetyTipBullet}>
          <Entypo
            name="dot-single"
            size={24}
            color={COLORS.gray7}
            style={styles.dotIcon}
          />
          <Text style={styles.SafetyTipText}>
            Always meet the seller in a well-lit, public location.
          </Text>
        </View>
        <View style={styles.SafetyTipBullet}>
          <Entypo
            name="dot-single"
            size={24}
            color={COLORS.gray7}
            style={styles.dotIcon}
          />
          <Text style={styles.SafetyTipText}>
            Carefully inspect the item before making a decision.
          </Text>
        </View>
        <View style={styles.SafetyTipBullet}>
          <Entypo
            name="dot-single"
            size={24}
            color={COLORS.gray7}
            style={styles.dotIcon}
          />
          <Text style={styles.SafetyTipText}>
            Ensure the item being packed is the same one you inspected.
          </Text>
        </View>
        <View style={styles.SafetyTipBullet}>
          <Entypo
            name="dot-single"
            size={24}
            color={COLORS.gray7}
            style={styles.dotIcon}
          />
          <Text style={styles.SafetyTipText}>
            Complete the payment only when fully satisfied with the purchase.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SafetyTipsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    gap: 8,
    width: "100%",
  },
  SafetyTipsTitle: {
    color: COLORS.gray8,
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
  },
  SafetyTipsContentContainer: {
    gap: 4,
    width: "100%",
  },
  SafetyTipBullet: {
    flexDirection: "row",
    width: "100%",
  },
  dotIcon: {
    marginLeft: -8,
  },
  SafetyTipText: {
    color: COLORS.gray7,
  },
});
