import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const GenerateReportScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fromDate, setFromDate] = useState("25/12/2025");
  const [toDate, setToDate] = useState("01/01/2026");

  const reportData = [
    {
      itemName: "Paracetamol",
      itemCode: "1008765",
      sellCapacity: "300",
      currentInventory: "90",
      emptyCell: "160",
      last7DaysSell: "250",
    },
    {
      itemName: "Syringe",
      itemCode: "1008765",
      sellCapacity: "100",
      currentInventory: "30",
      emptyCell: "70",
      last7DaysSell: "100",
    },
    {
      itemName: "Intra Vein",
      itemCode: "1008765",
      sellCapacity: "50",
      currentInventory: "4",
      emptyCell: "41",
      last7DaysSell: "45",
    },
    {
      itemName: "Cough Syrup",
      itemCode: "1008765",
      sellCapacity: "150",
      currentInventory: "15",
      emptyCell: "85",
      last7DaysSell: "100",
    },
    {
      itemName: "Antibiotic",
      itemCode: "1008765",
      sellCapacity: "150",
      currentInventory: "60",
      emptyCell: "90",
      last7DaysSell: "150",
    },
    {
      itemName: "Bandage",
      itemCode: "1008765",
      sellCapacity: "50",
      currentInventory: "6",
      emptyCell: "34",
      last7DaysSell: "40",
    },
    {
      itemName: "Oiments",
      itemCode: "1008765",
      sellCapacity: "20",
      currentInventory: "1",
      emptyCell: "14",
      last7DaysSell: "15",
    },
    {
      itemName: "Disprin",
      itemCode: "1008765",
      sellCapacity: "100",
      currentInventory: "60",
      emptyCell: "30",
      last7DaysSell: "90",
    },
    {
      itemName: "Needles",
      itemCode: "1008765",
      sellCapacity: "150",
      currentInventory: "60",
      emptyCell: "40",
      last7DaysSell: "100",
    },
  ];

  const renderDatePicker = () => (
    <Modal
      visible={showDatePicker}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDatePicker(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerTitle}>Select Date</Text>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.monthYear}>September 2022</Text>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>{">"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.daysHeader}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Text key={day} style={styles.dayHeader}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {/* Calendar days would go here */}
            <View style={styles.selectedDate}>
              <Text style={styles.selectedDateText}>23</Text>
            </View>
          </View>
          <View style={styles.datePickerButtons}>
            <TouchableOpacity
              style={styles.cancelDateButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.cancelDateButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okDateButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.okDateButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Generate Report</Text>

        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>Sales Report</Text>

          <View style={styles.dateSelectionContainer}>
            <Text style={styles.dateLabel}>Select Date From</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateInputText}>{fromDate}</Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>

            <Text style={styles.dateLabel}>To</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateInputText}>{toDate}</Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reportDetails}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportNumber}>
                Report Number: Report25_12_25
              </Text>
              <Text style={styles.reportDate}>
                From : {fromDate} To : {toDate}
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.stockReportTitle}>Stock Report</Text>

            <ScrollView
              style={styles.tableContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Item Name</Text>
                <Text style={styles.headerCell}>Item Code</Text>
                <Text style={styles.headerCell}>Sell Capacity</Text>
                <Text style={styles.headerCell}>Current Inventory</Text>
                <Text style={styles.headerCell}>Empty Cell</Text>
                <Text style={styles.headerCell}>Last 7 Days Sell</Text>
              </View>

              {reportData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{item.itemName}</Text>
                  <Text style={styles.cell}>{item.itemCode}</Text>
                  <Text style={styles.cell}>{item.sellCapacity}</Text>
                  <Text style={styles.cell}>{item.currentInventory}</Text>
                  <Text style={styles.cell}>{item.emptyCell}</Text>
                  <Text style={styles.cell}>{item.last7DaysSell}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.navigate("./cancel-overlay")}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.printButton}
              onPress={() => router.navigate("./report-print-success")}
            >
              <Text style={styles.printButtonText}>Print Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderDatePicker()}
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    marginBottom: 20,
  },
  reportContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 20,
  },
  dateSelectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: Colors.DARK_GREEN,
    fontWeight: "bold",
  },
  dateInput: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PERSIAN_GREEN,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 100,
  },
  dateInputText: {
    fontSize: 14,
    color: Colors.DARK_GREEN,
    flex: 1,
  },
  calendarIcon: {
    fontSize: 16,
  },
  reportDetails: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  reportNumber: {
    fontSize: 12,
    color: Colors.DARK_GREEN,
    fontWeight: "bold",
  },
  reportDate: {
    fontSize: 12,
    color: Colors.DARK_GREEN,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    marginBottom: 10,
  },
  stockReportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    marginBottom: 10,
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 8,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    color: Colors.WHITE,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY_BORDER,
  },
  cell: {
    flex: 1,
    fontSize: 10,
    color: Colors.DARK_GREEN,
    textAlign: "center",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  rightButtons: {
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.PERSIAN_GREEN,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.PERSIAN_GREEN,
    fontSize: 16,
    fontWeight: "bold",
  },
  printButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  printButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
    fontWeight: "bold",
  },
  monthYear: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dayHeader: {
    flex: 1,
    fontSize: 12,
    color: Colors.DARK_GREEN,
    textAlign: "center",
    fontWeight: "bold",
  },
  calendarGrid: {
    marginBottom: 20,
  },
  selectedDate: {
    width: 30,
    height: 30,
    backgroundColor: Colors.PERSIAN_GREEN,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  selectedDateText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
  },
  datePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelDateButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.PERSIAN_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 0.45,
  },
  cancelDateButtonText: {
    color: Colors.PERSIAN_GREEN,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  okDateButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 0.45,
  },
  okDateButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GenerateReportScreen;
