import CancelConfirmationModal from "@/components/CancelConfirmationModal"; // Add this import
import { isLandscape } from "@/utils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

// Device detection helpers
const isTablet = width >= 768;
const isMobile = width < 768;

const InventoryOverviewScreen = () => {
  const [_isLandscape, setIsLandscape] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [showCancelModal, setShowCancelModal] = useState(false); // Modal state

  const inventoryData = {
    genericName: "acbjkfvbsf",
    brandName: "Cipla",
    mfgBy: "Cipla",
    marketedBy: "Cipla",
    day: "Tuesday",
    date: "27/08/2025",
    time: "14:38",
    totalInventory: "85",
    totalCapacity: "100",
    balanceRefill: "15",
  };

  useEffect(() => {
    const listener = Dimensions.addEventListener(
      "change",
      handleOrientationChange
    );

    return () => {
      listener.remove();
    };
  }, []);

  const handleOrientationChange = ({
    screen,
  }: {
    screen: {
      width: number;
      height: number;
    };
  }) => {
    const _isLandscape = isLandscape(screen);
    setIsLandscape(_isLandscape);
    setCurrentWidth(screen.width);
  };

  const getCardWidth = () => {
    if (currentWidth < 768) return "100%"; // Mobile
    if (_isLandscape) return "24%"; // Landscape tablet
    return "49%"; // Portrait tablet
  };

  // Modal handlers
  const handleCancelPress = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    router.navigate("/owner-dashboard"); // Navigate to dashboard or wherever appropriate
  };

  const handleCancelDismiss = () => {
    setShowCancelModal(false);
  };

  const renderInventoryCard = (index: number) => (
    <View
      key={index}
      style={[
        styles.card,
        { width: getCardWidth() },
        isMobile ? styles.cardMobile : undefined,
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          isMobile ? styles.cardTitleMobile : undefined,
        ]}
      >
        Paracetamol
      </Text>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Generic Name:
          </Text>
          <Text
            style={[styles.value, isMobile ? styles.valueMobile : undefined]}
          >
            {inventoryData.genericName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Brand Name:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.brandName}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Mfg By:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.mfgBy}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Marketed By:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.marketedBy}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Day:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.day}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Date:
          </Text>
          <Text
            style={[styles.value, isMobile ? styles.valueMobile : undefined]}
          >
            {inventoryData.date}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Time:
          </Text>
          <Text
            style={[styles.value, isMobile ? styles.valueMobile : undefined]}
          >
            {inventoryData.time}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Total Inventory:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.totalInventory}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Total Capacity:
          </Text>
          <Text
            style={[
              styles.highlightedValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.totalCapacity}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, isMobile ? styles.labelMobile : undefined]}
          >
            Balance Refill:
          </Text>
          <Text
            style={[
              styles.refillValue,
              isMobile ? styles.valueMobile : undefined,
            ]}
          >
            {inventoryData.balanceRefill}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.addButton,
          isMobile ? styles.addButtonMobile : undefined,
        ]}
        onPress={() => router.navigate("./add-inventory")}
      >
        <Text
          style={[
            styles.addButtonText,
            isMobile ? styles.addButtonTextMobile : undefined,
          ]}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={[styles.title, isMobile ? styles.titleMobile : undefined]}>
          Inventory Overview
        </Text>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[
              styles.gridContainer,
              isMobile ? styles.gridContainerMobile : undefined,
            ]}
          >
            {Array.from({ length: 8 }, (_, index) =>
              renderInventoryCard(index)
            )}
          </View>
        </ScrollView>

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
              onPress={() => router.navigate("./add-inventory")}
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
      </View>

      {/* Add Cancel Confirmation Modal */}
      {/* Add Cancel Confirmation Modal */}
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
  },
  container: {
    flex: 1,
    paddingHorizontal: isTablet ? 20 : 16,
    paddingTop:
      Platform.OS === "ios" ? (isTablet ? 80 : 50) : isTablet ? 60 : 40,
    paddingBottom:
      Platform.OS === "ios" ? (isTablet ? 30 : 34) : isTablet ? 20 : 16,
  },
  title: {
    fontSize: isTablet ? 24 : 22,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: isTablet ? 20 : 16,
  },
  titleMobile: {
    fontSize: 20,
    marginBottom: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  gridContainerMobile: {
    gap: 8,
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.PERSIAN_GREEN,
    marginBottom: 15,
  },
  cardMobile: {
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    marginBottom: 10,
    textAlign: "center",
  },
  cardTitleMobile: {
    fontSize: 14,
    marginBottom: 8,
  },
  cardContent: {
    gap: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: Colors.DARK_GREEN,
    flex: 1,
  },
  labelMobile: {
    fontSize: 11,
  },
  value: {
    fontSize: 12,
    color: Colors.DARK_GREEN,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  valueMobile: {
    fontSize: 11,
  },
  highlightedValue: {
    fontSize: 12,
    color: Colors.PERSIAN_GREEN,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  refillValue: {
    fontSize: 12,
    color: Colors.RED,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  addButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonMobile: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
  },
  addButtonTextMobile: {
    fontSize: 12,
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
});

export default InventoryOverviewScreen;
