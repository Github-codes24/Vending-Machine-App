import { View, Text, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'

const ChooseRelationship: React.FC<any> = ({ navigation }) => {

  const [selected, setSelected] = useState<string | null>('Self');

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('BillAccount');
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
          <Text style={styles.title}>{Strings.selectRelationship}</Text>
          <LargeButton
            label={Strings.self}
            selected={selected === 'Self'}
            onPress={() => setSelected('Self')}
          />
          <LargeButton
            label={Strings.husband}
            selected={selected === 'Husband'}
            onPress={() => setSelected('Husband')}
          />
          <LargeButton
            label={Strings.wife}
            selected={selected === 'Wife'}
            onPress={() => setSelected('Wife')}
          />
          <LargeButton
            label={Strings.daughter}
            selected={selected === 'Daughter'}
            onPress={() => setSelected('Daughter')}
          />
          <LargeButton
            label={Strings.son}
            selected={selected === 'Son'}
            onPress={() => setSelected('Son')}
          />
          <LargeButton
            label={Strings.other}
            selected={selected === 'Other'}
            onPress={() => setSelected('Other')}
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
export default ChooseRelationship