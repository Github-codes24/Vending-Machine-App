import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  BACKGROUNDCOLOR,
  Images,
  PRIMARY_COLOR,
  RED,
  Strings,
} from '../../constants';
import CustomButton from '../../component/button';
import Header from '../../component/header';
import CommonPopup from '../../component/commonPopup';

const BillAccount: React.FC<any> = ({ navigation }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const handleContinue = () => {
    navigation.navigate('MedicineDispatched');
  };

  const handleGoBack = () => {
    setPopupVisible(false);
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
          <View style={styles.subContainer}>
            <Text style={styles.title}>{Strings.currentBalance}</Text>
            <Text style={styles.subTitle}>Rs {15000}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{Strings.billingAmount}</Text>
            <Text style={styles.subTitle}>Rs {5000}</Text>
          </View>
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
  );
};
export default BillAccount;
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
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  subContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#19776B',
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
