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
        <View style={styles.popupContainer}>
          {type === 'cancel' && (
            <>
              <Text style={styles.title}>Are you sure you want to cancel?</Text>
              <View style={styles.buttonRow}>
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
              </View>
            </>
          )}

          {type === 'balance' && (
            <>
              <Text style={styles.title}>Your Account Balance is</Text>
              <Text style={styles.balanceText}>{balanceAmount}</Text>

              <View style={styles.buttonRow}>
                <CustomButton
                  label="Back"
                  color={PRIMARY_COLOR}
                  outlined
                  onPress={onClose}
                  style={styles.button}
                />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUNDCOLOR,
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: DARK_GREEN,
    textAlign: 'center',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
    color: DARK_GREEN,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  button: {
    minWidth: 100,
  },
});

export default DynamicPopup;
