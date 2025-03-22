import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { COLORS } from "@/constants/theme";
import Entypo from "@expo/vector-icons/Entypo";

const screenWidth = Dimensions.get("window").width * 0.999;

type InputSelectProps = {
  options: string[];
  initialValue?: string;
  onSelect: (value: string) => void;
};

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialSelectValue = props.initialValue || "Select an option";
  const [selectedValue, setSelectedValue] = useState(initialSelectValue);

  const selectHandler = (value: string) => {
    props.onSelect(value);
    setIsOpen(false);
    setSelectedValue(() => value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selected}>{selectedValue}</Text>
        <Entypo
          name="triangle-down"
          size={24}
          color={COLORS.gray8}
          style={styles.triangleIcon}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={props.options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectHandler(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.gray6,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  selected: {
    fontSize: 16,
    color: COLORS.gray8,
  },
  triangleIcon: { marginRight: -4 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: screenWidth * 0.96 - 32,
    borderRadius: 8,
    paddingVertical: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
