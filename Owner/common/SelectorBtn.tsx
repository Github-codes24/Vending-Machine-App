import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

function SelectorBtn({
  label,
  color,
  onPress,
  outlined = false,
  style,
}: {
  label: string;
  color: string;
  onPress: () => void;
  style?: ViewStyle;
  outlined?: boolean;
}) {
  return (
    <Pressable
      style={[
        styles.button,
        isMobile ? styles.buttonMobile : undefined,
        outlined
          ? {
              borderColor: color,
              borderWidth: 2,
              backgroundColor: "transparent",
            }
          : { backgroundColor: color },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, isMobile ? styles.textMobile : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonMobile: {
    paddingVertical: 14,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  textMobile: {
    fontSize: 16,
  },
});

export default SelectorBtn;
