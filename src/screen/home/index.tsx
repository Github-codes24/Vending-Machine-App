import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Images, Strings, RED, PRIMARY_COLOR } from '../../constants';
import styles from './style'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'
import CommonPopup from '../../component/commonPopup';
import Header from '../../component/header';

const Home: React.FC<any> = ({ navigation }) => {

  const [selected, setSelected] = useState<string | null>(Strings.checkBalance);
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
        resizeMode="stretch"
      >
        <Header
          backImageSource={Images.ic_left}
          onBack={() => navigation.goBack()}
          title=''
        />
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            {Strings.welcomeGourab}
          </Text>
          <Text style={styles.subtitleText}>
            {Strings.howCanWeHelpYouToday}
          </Text>

          <LargeButton
            label={Strings.checkBalance}
            selected={selected === Strings.checkBalance}
            onPress={() => {

              setIsPopupVisible(true)
              setSelected(Strings.checkBalance)
            }}
          />
          <LargeButton
            label={Strings.prescriptionSelection}
            selected={selected === Strings.prescriptionSelection}
            onPress={() => {
              navigation.navigate('SelectPrescription');
              setSelected(Strings.prescriptionSelection)
            }}
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
          showOk={false}
        />
        <CommonPopup
          visible={isPopupVisible}
          title={Strings.yourAccountBalance}
          icon={Images.ic_vector}
          onClose={() => setIsPopupVisible(false)}
          onConfirm={() => setIsPopupVisible(false)}
          showCancel={false}
          showOk={true}
          ammount='RS. 15,000'
          okText='Ok'
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
