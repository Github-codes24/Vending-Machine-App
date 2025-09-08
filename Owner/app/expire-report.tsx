import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const ExpireReportScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Expire Report</Text>

        <View style={styles.content}>
          <Text style={styles.message}>
            Expire Report functionality coming soon...
          </Text>
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.navigate("/cancel-overlay")}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.navigate("./owner-dashboard")}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 100,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
    textAlign: "center",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cancelButton: {
    backgroundColor: Colors.RED,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  cancelButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.PERSIAN_GREEN,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  backButtonText: {
    color: Colors.PERSIAN_GREEN,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  continueButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ExpireReportScreen;
