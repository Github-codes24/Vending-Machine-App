import SelectorBtn from "@/common/SelectorBtn";
import CancelConfirmationModal from "@/components/CancelConfirmationModal";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../common/Button";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

// Device detection helpers
const isTablet = width >= 768;
const isMobile = width < 768;

const OwnerDashboardScreen = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelPress = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    router.navigate("/"); // Navigate to home or wherever you want
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
      <View style={styles.container}>
        <Text
          style={[
            styles.welcomeText,
            isMobile ? styles.welcomeTextMobile : undefined,
          ]}
        >
          Welcome Owner Name!
        </Text>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.buttonContainer,
              isMobile ? styles.buttonContainerMobile : undefined,
            ]}
          >
            <SelectorBtn
              label="Manage Inventory"
              color={Colors.PERSIAN_GREEN}
              onPress={() => router.navigate("./inventory-overview")}
              style={isMobile ? styles.selectorBtnMobile : undefined}
            />
            <SelectorBtn
              label="Generate Report"
              color={Colors.PERSIAN_GREEN}
              onPress={() => router.navigate("./report-print-success")}
              style={isMobile ? styles.selectorBtnMobile : undefined}
            />
            <SelectorBtn
              label="Select Expire Report"
              color={Colors.PERSIAN_GREEN}
              onPress={() => router.navigate("./expire-report")}
              style={isMobile ? styles.selectorBtnMobile : undefined}
            />
            <SelectorBtn
              label="Generate Product Report"
              color={Colors.PERSIAN_GREEN}
              onPress={() => router.navigate("./product-report")}
              style={isMobile ? styles.selectorBtnMobile : undefined}
            />
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomButtonContainer,
            isMobile ? styles.bottomButtonContainerMobile : undefined,
          ]}
        >
          <CustomButton
            label="Cancel"
            color={Colors.RED}
            onPress={handleCancelPress} // Changed to show modal
          />

          <View
            style={[
              styles.rightButtonGroup,
              isMobile ? styles.rightButtonGroupMobile : undefined,
            ]}
          >
            {!isMobile && (
              <CustomButton
                label="Back"
                color={Colors.PERSIAN_GREEN}
                outlined
                onPress={() => router.back()}
              />
            )}

            <CustomButton
              label="Continue"
              color={Colors.PERSIAN_GREEN}
              onPress={() => router.navigate("./inventory-overview")}
              style={isMobile ? styles.continueButtonMobile : undefined}
            />
          </View>
        </View>
      </View>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: isTablet ? 20 : 16,
    paddingTop:
      Platform.OS === "ios" ? (isTablet ? 100 : 60) : isTablet ? 80 : 40,
    paddingBottom:
      Platform.OS === "ios" ? (isTablet ? 50 : 34) : isTablet ? 50 : 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: isTablet ? 60 : 30,
  },
  welcomeTextMobile: {
    fontSize: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: isTablet ? 500 : "100%",
    alignSelf: "center",
    gap: isTablet ? 20 : 16,
    paddingHorizontal: isTablet ? 20 : 0,
  },
  buttonContainerMobile: {
    gap: 12,
  },
  selectorBtnMobile: {
    paddingVertical: 14,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  bottomButtonContainerMobile: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
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
  cancelButtonMobile: {
    flex: 1,
  },
  continueButtonMobile: {
    flex: 1,
    minWidth: 100,
  },
});

export default OwnerDashboardScreen;
