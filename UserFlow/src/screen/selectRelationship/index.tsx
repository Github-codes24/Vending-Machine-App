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
import useUserStore from '../../store/userStore';
import CancelButton from '../../component/button/cancelButton';
import { useNavigation } from '@react-navigation/native';

const SelectRelationship: React.FC<any> = ({ navigation, route }) => {
  const [selected, setSelected] = useState<string | null>('Self');
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const { logout, setUser } = useUserStore();

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription?.remove();
  }, []);

  // In SelectRelationship screen
  const handleContinue = () => {
    navigation.navigate('BillAccount', {
      prescriptionId: route.params?.prescriptionId,
      prescriptionData: route.params?.prescriptionData,
      relationship: selected, // whatever relationship was selected
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Handle cancel button click - show popup
  const handleCancelClick = () => {
    setPopupVisible(true);
  };

  // Handle popup cancel (NO button)
  const handlePopupCancel = () => {
    setPopupVisible(false);
  };

  // Handle popup confirm (YES button) - perform logout
  const handleConfirmCancel = async () => {
    try {
      setPopupVisible(false);

      // Call logout from store
      await logout();

      // Clear user data
      setUser(null);

      // Navigate to Start screen and reset navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });

      // Alternative: If you want to just navigate without resetting stack
      // navigation.navigate('Start');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
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
            onBack={handleBack}
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
          <CancelButton
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
          onClose={handlePopupCancel}
          onConfirm={handleConfirmCancel}
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

export default SelectRelationship;
