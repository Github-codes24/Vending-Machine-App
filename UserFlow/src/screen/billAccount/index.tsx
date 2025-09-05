// BillAccount.tsx
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  BACKGROUNDCOLOR,
  Images,
  PRIMARY_COLOR,
  Strings,
  DARK_GREEN,
  RED,
} from '../../constants';
import CustomButton from '../../component/button';
import Header from '../../component/header';
import CancelButton from '../../component/button/cancelButton';
import CommonPopup from '../../component/commonPopup';
import useUserStore from '../../store/userStore';

const BillAccount: React.FC<any> = ({ navigation, route }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [insufficientBalancePopup, setInsufficientBalancePopup] =
    useState(false);

  // Get data from navigation params
  const { prescriptionId, prescriptionData, relationship } = route.params || {};

  // Get user balance from store
  const { balance, user, getUserBalance } = useUserStore();

  // Calculate billing amount from prescription medicines
  const medicines = prescriptionData?.medicines || [];
  const billingAmount = medicines.reduce((sum: number, medicine: any) => {
    return sum + (medicine.cost || 0);
  }, 0);

  useEffect(() => {
    // Fetch current balance when component mounts
    if (user?.rfid) {
      getUserBalance(user.rfid);
    }
  }, [user]);

  // Show popup when continue is clicked
  const handleContinueClick = () => {
    // Check if balance is sufficient
    if (balance < billingAmount) {
      setInsufficientBalancePopup(true);
    } else {
      setPopupVisible(true);
    }
  };

  // Handle popup confirmation (YES)
  const handleConfirmTransaction = () => {
    setPopupVisible(false);

    // Navigate to MedicineDispatched with billing data
    navigation.navigate('MedicineDispatched', {
      prescriptionId,
      prescriptionData,
      relationship,
      billingAmount,
      transactionSuccess: true,
    });
  };

  // Handle popup cancel (NO)
  const handleCancelTransaction = () => {
    setPopupVisible(false);
  };

  // Handle insufficient balance popup buttons
  const handleInsufficientBalanceNo = () => {
    setInsufficientBalancePopup(false);
  };

  const handleInsufficientBalanceYes = () => {
    setInsufficientBalancePopup(false);
    navigation.goBack();
  };

  const handleBack = () => {
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
            onBack={handleBack}
            title=""
          />
        )}

        <View style={[styles.content, isLandscape && styles.contentLandscape]}>
          <View
            style={[styles.balanceContainer, isLandscape && styles.centerAlign]}
          >
            <Text style={styles.balanceText}>
              Current Balance:{' '}
              <Text style={styles.amountText}>
                Rs. {balance ? balance.toLocaleString() : '0'}
              </Text>
            </Text>
            <Text style={styles.billingText}>
              Billing Amount:{' '}
              <Text style={styles.billingAmountText}>
                Rs. {billingAmount.toLocaleString()}
              </Text>
            </Text>

            {/* Optional: Show remaining balance after transaction */}
            {balance >= billingAmount && (
              <Text style={styles.remainingBalanceText}>
                Remaining Balance:{' '}
                <Text style={styles.amountText}>
                  Rs. {(balance - billingAmount).toLocaleString()}
                </Text>
              </Text>
            )}
          </View>
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
                onPress={handleContinueClick}
                style={styles.landscapeButton}
              />
            </View>
          )}

          {!isLandscape && (
            <CustomButton
              label={Strings.continue}
              color={PRIMARY_COLOR}
              onPress={handleContinueClick}
              style={styles.portraitButton}
            />
          )}
        </View>

        {/* Confirmation Popup */}
        <CommonPopup
          visible={popupVisible}
          title="Do you want to confirm this transaction?"
          icon={Images.ic_vector}
          onClose={handleCancelTransaction}
          onConfirm={handleConfirmTransaction}
          confirmText="Yes"
          cancelText="No"
          showCancel={true}
        />

        {/* Insufficient Balance Popup */}
        <CommonPopup
          visible={insufficientBalancePopup}
          title="Transaction cancelled due to insufficient balance."
          icon={Images.ic_cross}
          onClose={handleInsufficientBalanceNo}
          onConfirm={handleInsufficientBalanceYes}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentLandscape: {
    alignItems: 'center',
  },
  balanceContainer: {
    gap: 12,
  },
  centerAlign: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_GREEN,
  },
  billingText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  billingAmountText: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_GREEN,
  },
  remainingBalanceText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
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

export default BillAccount;
