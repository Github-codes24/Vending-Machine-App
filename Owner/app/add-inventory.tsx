import CancelConfirmationModal from "@/components/CancelConfirmationModal"; // Add this import
import ReportPrintSuccessModal from "@/components/ReportPrintSuccessModal";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

// Device detection helpers
const isTablet = width >= 768;
const isMobile = width < 768;

const AddInventoryScreen = () => {
  const [batchNo, setBatchNo] = useState("B5644HGH");
  const [tabletFormat, setTabletFormat] = useState("Anticeptic");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState("Bottle");
  const [showReportPrintSuccessModal, setShowReportPrintSuccessModal] =
    useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false); // Add cancel modal state

  const medicineTypes = ["Bottle", "Box", "Stripes", "Pack", "Other"];

  // Cancel modal handlers
  const handleCancelPress = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    router.navigate("/owner-dashboard"); // Navigate to dashboard or previous screen
  };

  const handleCancelDismiss = () => {
    setShowCancelModal(false);
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.contentContainer}>
            <Text
              style={[styles.title, isMobile ? styles.titleMobile : undefined]}
            >
              Add Inventory
            </Text>

            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={[
                  styles.formContainer,
                  isMobile ? styles.formContainerMobile : undefined,
                ]}
              >
                <View
                  style={[
                    styles.inputContainer,
                    isMobile ? styles.inputContainerMobile : undefined,
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      isMobile ? styles.labelMobile : undefined,
                    ]}
                  >
                    Batch No
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      isMobile ? styles.inputMobile : undefined,
                    ]}
                    value={batchNo}
                    onChangeText={setBatchNo}
                    placeholder="Enter batch number"
                    placeholderTextColor="#999"
                  />
                </View>

                <View
                  style={[
                    styles.inputContainer,
                    isMobile ? styles.inputContainerMobile : undefined,
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      isMobile ? styles.labelMobile : undefined,
                    ]}
                  >
                    Tablet Format
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      isMobile ? styles.inputMobile : undefined,
                    ]}
                    value={tabletFormat}
                    onChangeText={setTabletFormat}
                    placeholder="Enter tablet format"
                    placeholderTextColor="#999"
                  />
                </View>

                <View
                  style={[
                    styles.inputContainer,
                    isMobile ? styles.inputContainerMobile : undefined,
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      isMobile ? styles.labelMobile : undefined,
                    ]}
                  >
                    Type Of Medicine
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,
                      isMobile ? styles.inputMobile : undefined,
                    ]}
                    onPress={() => setShowDropdown(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        isMobile ? styles.dropdownTextMobile : undefined,
                      ]}
                    >
                      {selectedType}
                    </Text>
                    <Text
                      style={[
                        styles.dropdownArrow,
                        isMobile ? styles.dropdownArrowMobile : undefined,
                      ]}
                    >
                      ▼
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={[
              styles.bottomButtonContainer,
              isMobile ? styles.bottomButtonContainerMobile : undefined,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.cancelButton,
                isMobile ? styles.cancelButtonMobile : undefined,
              ]}
              onPress={handleCancelPress} // Changed to show modal
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  isMobile ? styles.buttonTextMobile : undefined,
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.rightButtonGroup,
                isMobile ? styles.rightButtonGroupMobile : undefined,
              ]}
            >
              {!isMobile && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.doneButton,
                  isMobile ? styles.doneButtonMobile : undefined,
                ]}
                onPress={() => setShowReportPrintSuccessModal(true)}
              >
                <Text
                  style={[
                    styles.doneButtonText,
                    isMobile ? styles.buttonTextMobile : undefined,
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={showDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDropdown(false)}
            >
              <View
                style={[
                  styles.dropdownContainer,
                  isMobile ? styles.dropdownContainerMobile : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.dropdownTitle,
                    isMobile ? styles.dropdownTitleMobile : undefined,
                  ]}
                >
                  Type Of Medicine Drop Down
                </Text>
                <ScrollView style={styles.dropdownScrollView}>
                  <View style={styles.dropdownList}>
                    {medicineTypes.map((type, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownItem,
                          isMobile ? styles.dropdownItemMobile : undefined,
                        ]}
                        onPress={() => {
                          setSelectedType(type);
                          setShowDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            isMobile
                              ? styles.dropdownItemTextMobile
                              : undefined,
                          ]}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Success Modal */}
      <ReportPrintSuccessModal
        visible={showReportPrintSuccessModal}
        onClose={() => {
          setShowReportPrintSuccessModal(false);
          setTimeout(() => {
            router.navigate("./owner-dashboard");
          }, 500);
        }}
      />

      {/* Cancel Confirmation Modal */}
      <CancelConfirmationModal
        visible={showCancelModal}
        onCancel={handleCancelDismiss}
        onConfirm={handleCancelConfirm}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: isTablet ? 20 : 16,
    paddingTop: isTablet ? 40 : 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: isTablet ? 24 : 22,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: isTablet ? 40 : 20,
  },
  titleMobile: {
    fontSize: 20,
    marginBottom: 16,
  },
  formContainer: {
    gap: 30,
    maxWidth: isTablet ? 500 : "100%",
    alignSelf: "center",
    width: "100%",
  },
  formContainerMobile: {
    gap: 20,
  },
  inputContainer: {
    gap: 10,
  },
  inputContainerMobile: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
  },
  labelMobile: {
    fontSize: 14,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PERSIAN_GREEN,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.DARK_GREEN,
  },
  inputMobile: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  dropdownButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PERSIAN_GREEN,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.DARK_GREEN,
  },
  dropdownTextMobile: {
    fontSize: 14,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.DARK_GREEN,
  },
  dropdownArrowMobile: {
    fontSize: 10,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  bottomButtonContainerMobile: {
    paddingVertical: 12,
    gap: 12,
  },
  rightButtonGroup: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  rightButtonGroupMobile: {
    flex: 1,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    maxWidth: 240,
    minWidth: 80,
    marginHorizontal: 4,
  },
  cancelButtonMobile: {
    flex: 1,
    minWidth: 70,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },
  cancelButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.PERSIAN_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    maxWidth: 240,
    minWidth: 80,
    marginHorizontal: 4,
  },
  backButtonText: {
    color: Colors.PERSIAN_GREEN,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    maxWidth: 240,
    minWidth: 80,
    marginHorizontal: 4,
  },
  doneButtonMobile: {
    flex: 1,
    minWidth: 70,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },
  doneButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonTextMobile: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 20,
    width: isTablet ? "80%" : "90%",
    maxHeight: "60%",
    maxWidth: 500,
  },
  dropdownContainerMobile: {
    padding: 16,
    width: "90%",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownTitleMobile: {
    fontSize: 16,
    marginBottom: 16,
  },
  dropdownScrollView: {
    maxHeight: 300,
  },
  dropdownList: {
    gap: 10,
  },
  dropdownItem: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PERSIAN_GREEN,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  dropdownItemMobile: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.DARK_GREEN,
  },
  dropdownItemTextMobile: {
    fontSize: 14,
  },
});

export default AddInventoryScreen;
