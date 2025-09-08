import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { WHITE } from "../constants/Colors";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

type CustomButtonProps = {
  label: string;
  color: string;
  onPress: () => void;
  style?: ViewStyle;
  outlined?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  color,
  onPress,
  style,
  outlined = false,
}) => {
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
      <Text
        style={[
          styles.text,
          isMobile ? styles.textMobile : undefined,
          { color: outlined ? color : WHITE },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 240,
    minWidth: 80,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonMobile: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 70,
    marginHorizontal: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textMobile: {
    fontSize: 14,
  },
});

export default CustomButton;
