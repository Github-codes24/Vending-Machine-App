import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Colors from "../constants/Colors";

const ReportPrintSuccessScreen = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      navigationBarTranslucent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          <Text style={styles.successText}>Report Print Successful !</Text>

          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.NEON_GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  successText: {
    fontSize: 20,
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  okButton: {
    backgroundColor: Colors.DARK_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
  },
  okButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReportPrintSuccessScreen;
