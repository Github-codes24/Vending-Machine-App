import {
  View,
  Text,
  ImageBackground,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants';
import LargeButton from '../../component/largeButton';
import CustomButton from '../../component/button';
import Header from '../../component/header';
import CommonPopup from '../../component/commonPopup';
import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR } from '../../constants';

const ChooseRelationship: React.FC<any> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>('Self');
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // ✅ Detect orientation changes
  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    // Initial check
    updateLayout();

    // Listen to orientation changes
    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Cleanup
    return () => subscription?.remove();
  }, []);

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('BillAccount');
    } else {
      Alert.alert('Please select a relationship');
    }
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

        <View style={styles.subContainer}>
          <Text style={styles.title}>{Strings.selectRelationship}</Text>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>
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
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2E5A3E', // DARK_GREEN
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  portraitButton: {
    width: 150,
    maxWidth: 150,
  },
  landscapeButton: {
    width: 100,
    maxWidth: 240,
  },
});

export default ChooseRelationship;
