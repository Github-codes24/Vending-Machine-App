import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { PRIMARY_COLOR, WHITE, DARK_GREEN } from '../../constants';

type LargeButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const LargeButton: React.FC<LargeButtonProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        selected
          ? { backgroundColor: PRIMARY_COLOR }
          : { borderColor: PRIMARY_COLOR, borderWidth: 2 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: selected ? WHITE : DARK_GREEN }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    maxWidth: 500,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LargeButton;
