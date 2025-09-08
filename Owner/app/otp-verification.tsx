import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["9", "9", "9", "9"]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.instruction}>
          Please enter the OTP we just sent to{"\n"}
          mobile no. ending with{" "}
          <Text style={styles.highlightedText}>XXXXXX32100</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              maxLength={1}
              keyboardType="numeric"
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {"Didn't receive the OTP? "}
            <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => router.navigate("./owner-dashboard")}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    marginBottom: 30,
  },
  instruction: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
  },
  highlightedText: {
    color: Colors.PERSIAN_GREEN,
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    marginBottom: 40,
    gap: 10,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    fontSize: 22,
    fontWeight: "500",
    color: Colors.DARK_GREEN,
  },
  resendContainer: {
    marginBottom: 80,
  },
  resendText: {
    fontSize: 18,
    color: Colors.DARK_GREEN,
  },
  resendLink: {
    color: Colors.PERSIAN_GREEN,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 50,
    paddingHorizontal: 30,
  },
  cancelButton: {
    backgroundColor: Colors.RED,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  cancelButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: Colors.PERSIAN_GREEN,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  verifyButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OTPVerificationScreen;
