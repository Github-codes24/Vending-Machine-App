import { View, Text, ImageBackground, Alert, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Images,
  PRIMARY_COLOR,
  BACKGROUNDCOLOR,
  DARK_GREEN,
} from '../../constants';
import LargeButton from '../../component/largeButton';
import CustomButton from '../../component/button';
import { StyleSheet } from 'react-native';
import CancelButton from '../../component/button/cancelButton';
import useLanguageStore from '../../store/languageStore';
import Strings from '../../constants/LanguageStrings';

const ChooseLanguage: React.FC<any> = ({ navigation }) => {
  const { currentLanguage, changeLanguage } = useLanguageStore();
  const [selected, setSelected] = useState<string>(
    currentLanguage === 'hi'
      ? 'Hindi'
      : currentLanguage === 'mr'
      ? 'Marathi'
      : 'English',
  );
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect orientation changes
  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription?.remove();
  }, []);

  const handleContinue = async () => {
    if (selected) {
      console.log('Selected Language:', selected);

      // Map selection to language code and update
      const languageMap: { [key: string]: string } = {
        English: 'en',
        Hindi: 'hi',
        Marathi: 'mr',
      };

      await changeLanguage(languageMap[selected]);
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
          <CancelButton
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingBottom: 40,
    paddingTop: 20,
    gap: 14,
  },
  portraitButton: {
    width: 150,
  },
  landscapeButton: {
    width: 100,
  },
});

export default ChooseLanguage;
