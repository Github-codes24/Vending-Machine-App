import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { DARK_GREEN, PRIMARY_COLOR, WHITE } from '../../constants';
interface CommonPopupProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  icon?: ImageSourcePropType;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showOk?: boolean;
  ammount?: string,
  okText?: string,
}

const CommonPopup: React.FC<CommonPopupProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  icon,
  ammount,
  confirmText = 'YES',
  cancelText = 'NO',
  showCancel = true,
  showOk,
  okText = 'OK'
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={styles.title}>{title}</Text>
          {ammount &&
            <Text style={styles.ammountTxt}>{ammount}</Text>
          }
          {showCancel && (
            <View style={styles.buttons}>
              <Pressable onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </Pressable>
              <Pressable onPress={onConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmText}>{confirmText}</Text>
              </Pressable>
            </View>
          )}
          {showOk && (
            <Pressable onPress={onClose} style={styles.OkButton}>
              <Text style={styles.cancelText}>{okText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CommonPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    color: DARK_GREEN,
  },
  ammountTxt: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    color: DARK_GREEN,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  OkButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width : '60%',
  },
  cancelText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  confirmText: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
