import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Images,
  Strings,
  RED,
  PRIMARY_COLOR,
  BACKGROUNDCOLOR,
  DARK_GREEN,
} from '../../constants';
import LargeButton from '../../component/largeButton';
import CustomButton from '../../component/button';
import CommonPopup from '../../component/commonPopup';
import Header from '../../component/header';

const Home: React.FC<any> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(Strings.checkBalance);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription?.remove();
  }, []);

  const handleContinue = () => {
    navigation.navigate('SelectPrescription');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleGoBack = () => {
    setPopupVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
        resizeMode="stretch"
      >
        {!isLandscape && (
          <Header
            backImageSource={Images.ic_left}
            onBack={() => navigation.goBack()}
            title=""
          />
        )}

        <View style={styles.content}>
          <Text style={styles.welcomeText}>{Strings.welcomeGourab}</Text>
          <Text style={styles.subtitleText}>
            {Strings.howCanWeHelpYouToday}
          </Text>

          <LargeButton
            label={Strings.checkBalance}
            selected={selected === Strings.checkBalance}
            onPress={() => {
              setIsPopupVisible(true);
              setSelected(Strings.checkBalance);
            }}
          />
          <LargeButton
            label={Strings.prescriptionSelection}
            selected={selected === Strings.prescriptionSelection}
            onPress={() => {
              navigation.navigate('SelectPrescription');
              setSelected(Strings.prescriptionSelection);
            }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label={Strings.cancel}
            color={RED}
            onPress={() => setPopupVisible(true)}
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          />

          {isLandscape && (
            <View style={styles.rightButtons}>
              <CustomButton
                label="Back"
                color={PRIMARY_COLOR}
                outlined={true}
                onPress={handleBack}
                style={styles.landscapeButton}
              />
              <CustomButton
                label={Strings.continue}
                color={PRIMARY_COLOR}
                onPress={handleContinue}
                style={styles.landscapeButton}
              />
            </View>
          )}

          {!isLandscape && (
            <CustomButton
              label={Strings.continue}
              color={PRIMARY_COLOR}
              onPress={handleContinue}
              style={styles.portraitButton}
            />
          )}
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
          ammount="RS. 15,000"
          okText="Ok"
        />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'center',
    color: DARK_GREEN,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    color: DARK_GREEN,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  // ✅ Portrait mode: wider buttons (2 buttons)
  portraitButton: {
    width: 150,
    // maxWidth: 150,
  },
  // ✅ Landscape mode: narrower buttons (3 buttons)
  landscapeButton: {
    width: 100,
    // maxWidth: ,
  },
});

export default Home;
