import { View, Text, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'
import Header from '../../component/header'
import CommonPopup from '../../component/commonPopup'

const ChooseRelationship: React.FC<any> = ({ navigation }) => {

  const [selected, setSelected] = useState<string | null>('Self');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('BillAccount');
    } else {
      Alert.alert('Please select a language');
    }
  };

  const handleGoBack = () => {
    setPopupVisible(false)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
        resizeMode="stretch">
        <Header
          backImageSource={Images.ic_left}
          onBack={() => navigation.goBack()}
          title=''
        />
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
            onPress={() => setPopupVisible(true)}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
          />
        </View>
        <CommonPopup
          visible={popupVisible}
          title={Strings.areYouSureWantToCancelTheProcess}
          icon={Images.ic_vector}
          onClose={() => setPopupVisible(false)}
          onConfirm={handleGoBack}
          confirmText="YES"
          cancelText="NO"
          showCancel={true}
        />
      </ImageBackground>
    </View>
  )
}
export default ChooseRelationship