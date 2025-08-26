import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { DARK_GREEN } from '../../constants';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  backImageSource?: any;
  rightImageSource?: any;
  onRightPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  backImageSource,
  rightImageSource,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      {onBack && backImageSource ? (
        <Pressable onPress={onBack} style={styles.iconButton}>
          <Image source={backImageSource} style={styles.iconImage} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightImageSource ? (
        <Pressable onPress={onRightPress} style={styles.iconButton}>
          <Image source={rightImageSource} style={styles.iconImage} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: DARK_GREEN,
    textAlign: 'center',
    flex: 1,
  },
});
