import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Images, Strings, RED, PRIMARY_COLOR } from '../../constants';
import styles from './style'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'
import CommonPopup from '../../component/commonPopup';

const Home: React.FC<any> = ({ navigation }) => {

  const [popupVisible, setPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleContinue = () => {
    navigation.navigate('SelectPrescription');
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
      >
        <View style={styles.headerIcon}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            {Strings.welcomeGourab}
          </Text>
          <Text style={styles.subtitleText}>
            {Strings.howCanWeHelpYouToday}
          </Text>

          <LargeButton
            label={Strings.checkBalance}
            selected={true}
            onPress={() => setIsPopupVisible(true)}
          />
          <LargeButton
            label={Strings.prescriptionSelection}
            selected={false}
            onPress={() => console.log('Prescription Selection Pressed')}
          />
        </View>

        <View style={styles.actionButtons}>
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
        <CommonPopup
          visible={isPopupVisible}
          title={Strings.yourAccountBalance}
          icon={Images.ic_vector}
          onClose={() => setPopupVisible(false)}
          onConfirm={handleGoBack}
          confirmText="Ok"
          showCancel={false}
          ammount='RS. 15000'
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
