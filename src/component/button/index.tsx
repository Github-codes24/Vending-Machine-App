import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { WHITE } from '../../constants';

type CustomButtonProps = {
  label: string;
  color: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label, color, onPress
}) => {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});


export default CustomButton;
