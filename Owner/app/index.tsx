import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Colors from "../constants/Colors";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>

        <Image
          source={require("../assets/images/fingerPrint.png")}
          style={styles.fingerprintImage}
          resizeMode="contain"
        />

        <Text style={styles.instructionText}>
          Please scan your Finger Print
        </Text>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.navigate("/rfid-scan")}
        >
          <Text style={styles.scanButtonText}>Scan Fingerprint</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.DARK_GREEN,
    marginBottom: 60,
  },
  fingerprintImage: {
    width: 200,
    height: 250,
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

export default WelcomeScreen;
