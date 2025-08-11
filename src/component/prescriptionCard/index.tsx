import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { DARK_GREEN, Images, PERSIAN_GREEN, WHITE } from '../../constants';

interface Props {
  id: string;
  selected: boolean;
  onPress: () => void;
}

const PrescriptionCard: React.FC<Props> = ({ id, selected, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selectedCard]}>
      <Image
        source={Images.ic_dummyImg}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: selected ? WHITE : DARK_GREEN }]}>{id}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
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
    marginHorizontal: 20,
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
    borderRadius: 11,
    borderWidth: 2,
    borderColor: PERSIAN_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: WHITE,
  },
  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: WHITE,
    borderRadius: 5,
  },
});
