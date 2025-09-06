import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  BACKGROUNDCOLOR,
  Images,
  PRIMARY_COLOR,
  Strings,
  DARK_GREEN,
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
  const billingAmount = useMemo(() => {
    return medicines.reduce((sum: number, medicine: any) => {
      const cost = parseFloat(medicine?.cost) || 0;
      const quantity = parseInt(medicine?.quantity) || 1;
      const unitPrice = parseFloat(medicine?.unitPrice) || cost;

      // If cost is total cost, use it; otherwise calculate from unit price * quantity
      const totalCost = medicine?.totalCost
        ? parseFloat(medicine.totalCost)
        : cost > 0
        ? cost
        : unitPrice * quantity;

      return sum + totalCost;
    }, 0);
  }, [medicines]);

  useEffect(() => {
    // Fetch current balance when component mounts
    if (user?.rfid) {
      getUserBalance(user.rfid).catch(error => {
        console.error('Error fetching balance:', error);
      });
    }
  }, [user?.rfid]);

  const formatAmount = (amount: number | undefined): string => {
    const value = amount || 0;
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  // Show popup when continue is clicked
  const handleContinueClick = () => {
    // Check if balance is sufficient
    const currentBalance = balance || 0;

    if (currentBalance < billingAmount) {
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

    // Initial check
    updateLayout();

    // Add event listener
    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Cleanup
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
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
          {/* Portrait: align like the screenshot (labels left, amounts right) */}
          {!isLandscape && (
            <View style={styles.balanceBox}>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>Current Balance:</Text>
                <Text style={styles.amountText}>
                  Rs. {formatAmount(balance)}
                </Text>
              </View>

              <View style={styles.balanceRow}>
                <Text style={styles.billingText}>Billing Amount:</Text>
                <Text style={styles.billingAmountText}>
                  Rs. {formatAmount(billingAmount)}
                </Text>
              </View>
            </View>
          )}

          {/* Landscape: keep centered layout if preferred */}
          {isLandscape && (
            <View style={styles.balanceBoxLandscape}>
              <View style={styles.balanceRowLandscape}>
                <Text style={styles.balanceText}>Current Balance:</Text>
                <Text style={styles.amountText}>
                  Rs. {formatAmount(balance)}
                </Text>
              </View>

              <View style={styles.balanceRowLandscape}>
                <Text style={styles.billingText}>Billing Amount:</Text>
                <Text style={styles.billingAmountText}>
                  Rs. {formatAmount(billingAmount)}
                </Text>
              </View>
            </View>
          )}
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

  // Portrait box matching screenshot layout
  balanceBox: {
    width: '100%',
    gap: 16,
  },
  balanceRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Landscape variant (centered, optional narrower width)
  balanceBoxLandscape: {
    width: '70%',
    maxWidth: 500,
    gap: 12,
  },
  balanceRowLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceText: {
    fontSize: 20,
    fontWeight: '600',
    color: DARK_GREEN,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#19776B',
  },
  billingText: {
    fontSize: 20,
    fontWeight: '600',
    color: DARK_GREEN,
  },
  billingAmountText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#19776B',
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
