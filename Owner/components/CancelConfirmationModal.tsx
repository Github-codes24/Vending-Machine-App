import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

interface CancelConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, isMobile ? styles.modalMobile : undefined]}>
          <View
            style={[
              styles.iconContainer,
              isMobile ? styles.iconContainerMobile : undefined,
            ]}
          >
            <Text
              style={[
                styles.questionMark,
                isMobile ? styles.questionMarkMobile : undefined,
              ]}
            >
              ?
            </Text>
          </View>

          <Text
            style={[
              styles.questionText,
              isMobile ? styles.questionTextMobile : undefined,
            ]}
          >
            Are you sure want to cancel the process?
          </Text>

          <View
            style={[
              styles.buttonContainer,
              isMobile ? styles.buttonContainerMobile : undefined,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.noButton,
                isMobile ? styles.buttonMobile : undefined,
              ]}
              onPress={onCancel}
            >
              <Text
                style={[
                  styles.noButtonText,
                  isMobile ? styles.buttonTextMobile : undefined,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.yesButton,
                isMobile ? styles.buttonMobile : undefined,
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.yesButtonText,
                  isMobile ? styles.buttonTextMobile : undefined,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    width: "80%",
    maxWidth: 300,
  },
  modalMobile: {
    padding: 24,
    width: "90%",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.PERSIAN_GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainerMobile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 16,
  },
  questionMark: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.PERSIAN_GREEN,
  },
  questionMarkMobile: {
    fontSize: 28,
  },
  questionText: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  questionTextMobile: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
  },
  buttonContainerMobile: {
    gap: 12,
  },
  noButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.PERSIAN_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
  },
  noButtonText: {
    color: Colors.PERSIAN_GREEN,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  yesButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
  },
  yesButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonMobile: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonTextMobile: {
    fontSize: 14,
  },
});

export default CancelConfirmationModal;
