import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const RFIDScanScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/scanRFIDcard.png")}
          style={styles.rfidImage}
          resizeMode="contain"
        />

        <Text style={styles.instructionText}>Please scan your RFID card</Text>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.navigate("./otp-verification")}
        >
          <Text style={styles.scanButtonText}>Scan RFID Card</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  rfidImage: {
    width: 250,
    height: 200,
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 40,
  },
  scanButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RFIDScanScreen;
