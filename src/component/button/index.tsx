import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { WHITE } from '../../constants';

type CustomButtonProps = {
  label: string;
  color: string;
  onPress: () => void;
  style?: ViewStyle;
  outlined?: boolean; // ✅ NEW: for outlined buttons like "Back"
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
        outlined
          ? {
              borderColor: color,
              borderWidth: 2,
              backgroundColor: 'transparent',
            }
          : { backgroundColor: color },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: outlined ? color : WHITE }]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 240,
    minWidth: 80,
    flex: 1,
    marginHorizontal: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
