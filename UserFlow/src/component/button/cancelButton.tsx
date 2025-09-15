// component/CancelButton.tsx
import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import CustomButton from '../button/index';
import CommonPopup from '../../component/commonPopup';
import { RED, Images } from '../../constants';
import Strings from '../../constants/LanguageStrings';
import { useLogout } from '../../utils/useLogout';

interface CancelButtonProps {
  style?: ViewStyle;
  label?: string;
  popupTitle?: string;
  confirmText?: string;
  cancelText?: string;
  onBeforeLogout?: () => void; // Optional callback before logout
  outlined?: boolean;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  style,
  label = Strings.cancel,
  popupTitle = Strings.areYouSureWantToCancelTheProcess,
  confirmText = Strings.yes,
  cancelText = Strings.no,
  onBeforeLogout,
  outlined = false,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { performLogout, isLoggingOut } = useLogout();

  const handleCancelClick = () => {
    setPopupVisible(true);
  };

  const handlePopupCancel = () => {
    setPopupVisible(false);
  };

  const handleConfirmCancel = async () => {
    setPopupVisible(false);

    // Call optional callback before logout
    onBeforeLogout?.();

    // Perform logout
    await performLogout();
  };

  return (
    <>
      <CustomButton
        label={label}
        color={RED}
        onPress={handleCancelClick}
        style={style}
        outlined={outlined}
      />

      <CommonPopup
        visible={popupVisible}
        title={popupTitle}
        icon={Images.ic_vector}
        onClose={handlePopupCancel}
        onConfirm={handleConfirmCancel}
        confirmText={confirmText}
        cancelText={cancelText}
        showCancel={true}
      />

      {isLoggingOut && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default CancelButton;
