import { View, Text, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import {
  Images,
  PRIMARY_COLOR,
  RED,
  Strings,
  BACKGROUNDCOLOR,
  DARK_GREEN,
} from '../../constants';
import LargeButton from '../../component/largeButton';
import CustomButton from '../../component/button';
import { StyleSheet } from 'react-native';

const ChooseLanguage: React.FC<any> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>('English');

  const handleContinue = () => {
    if (selected) {
      console.log('Selected Language:', selected);
      navigation.navigate('Home');
    } else {
      Alert.alert('Please select a language');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.subContainer}>
          <Text style={styles.title}>{Strings.chooseLanguage}</Text>

          {/* Language Options */}
          <LargeButton
            label={Strings.english}
            selected={selected === 'English'}
            onPress={() => setSelected('English')}
          />
          <LargeButton
            label={Strings.hindi}
            selected={selected === 'Hindi'}
            onPress={() => setSelected('Hindi')}
          />
          <LargeButton
            label={Strings.marathi}
            selected={selected === 'Marathi'}
            onPress={() => setSelected('Marathi')}
          />
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label={Strings.cancel}
            color={RED}
            onPress={() => setSelected('English')}
            style={styles.cancelButton}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  subContainer: {
    flex: 0.9,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cancelButton: {
    flex: 0.45,
    maxWidth: 240,
  },
  continueButton: {
    flex: 0.45,
    maxWidth: 240,
  },
});

export default ChooseLanguage;
