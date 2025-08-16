import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageSourcePropType } from 'react-native';
import { DARK_GREEN, Images, PERSIAN_GREEN, WHITE } from '../../constants';

interface Props {
  id: string;
  selected: boolean;
  onPress: () => void;
  image: ImageSourcePropType;
}

const PrescriptionCard: React.FC<Props> = ({ id, selected, onPress, image }) => {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selectedCard]}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: selected ? WHITE : DARK_GREEN }]}>{id}</Text>
      <Image
        source={selected ? Images.ic_chekedIcon : Images.ic_unChecked}
        style={styles.radioOuter}
      />
    </Pressable>
  );
};

export default PrescriptionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: PERSIAN_GREEN,
    borderWidth: 2,
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  selectedCard: {
    backgroundColor: PERSIAN_GREEN,
  },
  image: {
    width: 50,
    height: 60,
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
  },
  radioOuter: {
    width: 22,
    height: 22,
  },
});
