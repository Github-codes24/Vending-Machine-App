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
  const [isLoading, setIsLoading] = useState(false);

  const { prescriptionId, prescriptionData, relationship } = route.params || {};

  const { balance, user, getUserBalance } = useUserStore();

  // Update the medicines extraction
  const medicines =
    prescriptionData?.prescription?.medicines ||
    prescriptionData?.medicines ||
    [];

  // Update the billingAmount calculation to handle different data structures
  const billingAmount = useMemo(() => {
    return medicines.reduce((sum: number, medicine: any) => {
      // Handle different possible field names
      const cost = parseFloat(medicine?.cost || medicine?.price || 0);
      const quantity = parseInt(medicine?.quantity || medicine?.qty || 1);
      const unitPrice = parseFloat(
        medicine?.unitPrice || medicine?.unit_price || cost,
      );

      // Calculate total cost
      const totalCost =
        medicine?.totalCost || medicine?.total_cost
          ? parseFloat(medicine.totalCost || medicine.total_cost)
          : unitPrice * quantity;

      return sum + totalCost;
    }, 0);
  }, [medicines]);
  console.log('Billing Amount:', billingAmount);
  console.log('Medicines:', medicines);
  console.log('Prescription Data:', prescriptionData);
  // console.log('totalCost:', total);
  useEffect(() => {
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

  const handleContinueClick = () => {
    const currentBalance = balance || 0;

    if (currentBalance < billingAmount) {
      setInsufficientBalancePopup(true);
    } else if (prescriptionData?.prescription?.collected === true) {
      Alert.alert('Alert', 'This prescription has already been collected.');
      setPopupVisible(true);
    } else {
      setPopupVisible(true);
    }
  };

  const handleCancelTransaction = () => {
    setPopupVisible(false);
  };
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

  const handleConfirmTransaction = async () => {
    setPopupVisible(false);

    if (!prescriptionId) {
      Alert.alert('Error', 'No prescription ID found');
      return;
    }

    if (!user?.rfid) {
      Alert.alert('Error', 'User RFID not found. Please login again.');
      return;
    }

    setIsLoading(true);

    try {
      // Fix the URL encoding - check if # is already encoded
      let encodedPrescriptionId = prescriptionId;
      if (prescriptionId.startsWith('#')) {
        encodedPrescriptionId = '%23' + prescriptionId.substring(1);
      } else if (!prescriptionId.startsWith('%23')) {
        encodedPrescriptionId = '%23' + prescriptionId;
      }

      const apiUrl = `https://vending-machine-backend-xjfo.onrender.com/api/prescriptions/${encodedPrescriptionId}/collect`;

      console.log('Making API request to:', apiUrl);
      console.log('Prescription ID:', prescriptionId);
      console.log('User RFID:', user?.rfid);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rfid: user.rfid,
          billingAmount: billingAmount,
        }),
      });

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      // Check if it's an "already collected" error
      let isAlreadyCollected = false;
      let errorMessage = '';

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          errorMessage =
            errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`;
        } catch (e) {
          errorMessage =
            responseText || `HTTP error! status: ${response.status}`;
        }

        // Check if prescription was already collected
        if (errorMessage.toLowerCase().includes('already collected')) {
          isAlreadyCollected = true;
          console.log('Prescription already collected, proceeding anyway...');
        } else {
          // For other errors, throw to catch block
          throw new Error(errorMessage);
        }
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText };
      }

      // Update user balance after successful transaction (or if already collected)
      if (user?.rfid) {
        getUserBalance(user.rfid).catch((error: unknown) => {
          console.error('Error updating balance:', error);
        });
      }

      // Navigate regardless of whether it's new collection or already collected
      navigation.navigate('MedicineDispatched', {
        prescriptionId,
        prescriptionData,
        relationship,
        billingAmount,
        transactionSuccess: true,
        collectionData: data,
        isAlreadyCollected, // Pass this flag to next screen
      });
    } catch (error: unknown) {
      // Handle only real errors (not "already collected")
      console.error('Error collecting prescription:', error);

      let errorMessage =
        'Unable to process your prescription. Please try again.';

      // Type guard to check if error is an Error object
      if (error instanceof Error) {
        console.error('Error details:', error.message);

        // More user-friendly error messages
        if (error.message.toLowerCase().includes('network')) {
          errorMessage =
            'Network error. Please check your connection and try again.';
        } else if (error.message.toLowerCase().includes('insufficient')) {
          errorMessage = 'Insufficient balance to complete this transaction.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      Alert.alert('Transaction Failed', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();

    const subscription = Dimensions.addEventListener('change', updateLayout);

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
    gap: 14,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 14,
  },
  portraitButton: {
    width: 150,
  },
  landscapeButton: {
    width: 100,
  },
});

export default BillAccount;
