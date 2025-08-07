import { View, Text, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'
import styles from './style'

const Bill: React.FC<any> = ({ navigation }) => {

  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      console.log('Selected Language:', selected);
      navigation.navigate('WelcomeScreen');
    } else {
      Alert.alert('Please select a language');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{Strings.chooseLanguage}</Text>
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
        <View style={styles.buttonContainer}>
          <CustomButton
            label={Strings.cancel}
            color={RED}
            onPress={() => setSelected(null)}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
          />
        </View>
      </ImageBackground>
    </View>
  )
}
export default Bill