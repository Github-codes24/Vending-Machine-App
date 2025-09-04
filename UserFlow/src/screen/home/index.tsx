import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import useUserStore from '../../store/userStore';
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
import CancelButton from '../../component/button/cancelButton';

const Home: React.FC<any> = ({ navigation }) => {
  const { user, getUserBalance, isLoading, error, balance } = useUserStore();
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

  const fetchUserBalance = () => {
    if (!user?.rfid) return;
    getUserBalance(user?.rfid);
  };

  useEffect(() => {
    fetchUserBalance();
  }, [user]);

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
    navigation.navigate('SelectRelationship', { userId: user?.id });
  };

  const handleBack = () => {
    navigation.navigate('ChooseLanguage');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={DARK_GREEN} />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (error && !balance) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <CustomButton
          label="Retry"
          color={PRIMARY_COLOR}
          onPress={fetchUserBalance}
          style={styles.retryButton}
        />
      </View>
    );
  }

  const formattedBalance = balance
    ? `Rs. ${balance.toLocaleString()}`
    : 'Rs. 0';

  return (
    <ImageBackground
      style={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      <View style={styles.overlay} />

      {!isLandscape && (
        <Header
          backImageSource={Images.ic_left}
          onBack={() => navigation.goBack()}
          title=""
        />
      )}

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {user?.name ? `Welcome ${user.name}` : Strings.welcome}
        </Text>
        <Text style={styles.subtitleText}>{Strings.howCanWeHelpYouToday}</Text>

        <LargeButton
          label={Strings.checkBalance}
          selected={selected === Strings.checkBalance}
          onPress={() => {
            setSelected(Strings.checkBalance);
            fetchUserBalance();
            openBalancePopup();
          }}
        />

        <LargeButton
          label={Strings.prescriptionSelection}
          selected={selected === Strings.prescriptionSelection}
          onPress={() => {
            navigation.navigate('SelectPrescription', {
              userId: user?.id,
              userName: user?.name,
            });
            setSelected(Strings.prescriptionSelection);
          }}
        />

        {user?.email && <Text style={styles.userInfoText}>{user.email}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <CancelButton
          style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          popupTitle="Are you sure you want to cancel the process?"
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
        balanceAmount={formattedBalance}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUNDCOLOR,
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
  userInfoText: {
    fontSize: 16,
    textAlign: 'center',
    color: DARK_GREEN,
    marginTop: 16,
    opacity: 0.8,
  },
  loadingText: {
    fontSize: 18,
    color: DARK_GREEN,
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: RED,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    width: 150,
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
