import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import CustomButton from './button';
import {
  PRIMARY_COLOR,
  RED,
  DARK_GREEN,
  Images,
  BACKGROUNDCOLOR,
} from '../constants';
const { width, height } = Dimensions.get('screen');

interface DynamicPopupProps {
  visible: boolean;
  type: 'cancel' | 'balance';
  onClose: () => void;
  onConfirm?: () => void;
  balanceAmount?: string;
}

const DynamicPopup: React.FC<DynamicPopupProps> = ({
  visible,
  type,
  onClose,
  balanceAmount,
  onConfirm = () => {},
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      navigationBarTranslucent
      statusBarTranslucent
    >
      <ImageBackground
        style={styles.modalOverlay}
        source={Images.ic_backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.container}>
          {/* Content Section */}
          <View style={styles.contentSection}>
            <View style={styles.popupContainer}>
              {type === 'cancel' && (
                <Text style={styles.title}>
                  Are you sure you want to cancel?
                </Text>
              )}

              {type === 'balance' && (
                <>
                  <Text style={styles.title}>Your Account Balance is</Text>
                  <Text style={styles.balanceText}>{balanceAmount}</Text>
                </>
              )}
            </View>
          </View>

          {/* Buttons Section - Fixed at Bottom */}
          <View style={styles.buttonSection}>
            <View style={styles.buttonRow}>
              {type === 'cancel' && (
                <>
                  <CustomButton
                    label="Cancel"
                    color={RED}
                    onPress={onClose}
                    style={styles.button}
                  />
                  <CustomButton
                    label="Yes, Exit"
                    color={PRIMARY_COLOR}
                    outlined
                    onPress={onConfirm}
                    style={styles.button}
                  />
                </>
              )}

              {type === 'balance' && (
                <>
                  <CustomButton
                    label="Cancel"
                    color={RED}
                    onPress={onConfirm}
                    style={styles.button}
                  />
                  <CustomButton
                    label="Back"
                    color={PRIMARY_COLOR}
                    outlined
                    onPress={onClose}
                    style={styles.button}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    width,
    height,
    backgroundColor: BACKGROUNDCOLOR,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popupContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 20,
    color: DARK_GREEN,
    textAlign: 'center',
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 15,
  },
});

export default DynamicPopup;
