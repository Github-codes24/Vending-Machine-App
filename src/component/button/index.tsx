import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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
