import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Images,
  Strings,
  RED,
  PRIMARY_COLOR,
  DARK_GREEN,
  BACKGROUNDCOLOR,
} from '../../constants';
import LargeButton from '../../component/largeButton';
import CustomButton from '../../component/button';
import Header from '../../component/header';
import DynamicPopup from '../../component/DynamicPopup';

const Home: React.FC<any> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(Strings.checkBalance);
  const [isLandscape, setIsLandscape] = useState(false);
  const [popupType, setPopupType] = useState<'cancel' | 'balance' | null>(null);

  const openCancelPopup = () => setPopupType('cancel');
  const openBalancePopup = () => setPopupType('balance');
  const closePopup = () => setPopupType(null);

  const handleConfirmCancel = () => {
    closePopup();
    navigation.goBack();
  };

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

  return (
    <ImageBackground
      style={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      {/* Overlay to improve readability */}
      <View style={styles.overlay} />

      {!isLandscape && (
        <Header
          backImageSource={Images.ic_left}
          onBack={() => navigation.goBack()}
          title=""
        />
      )}

      <View style={styles.content}>
        <Text style={styles.welcomeText}>{Strings.welcomeGourab}</Text>
        <Text style={styles.subtitleText}>{Strings.howCanWeHelpYouToday}</Text>

        <LargeButton
          label={Strings.checkBalance}
          selected={selected === Strings.checkBalance}
          onPress={() => {
            setSelected(Strings.checkBalance);
            openBalancePopup();
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
          onPress={openCancelPopup}
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

      <DynamicPopup
        visible={popupType !== null}
        type={popupType as 'cancel' | 'balance'}
        onClose={closePopup}
        onConfirm={handleConfirmCancel}
        balanceAmount="Rs. 15,000"
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
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
  portraitButton: {
    width: 150,
  },
  landscapeButton: {
    width: 100,
  },
});

export default Home;
