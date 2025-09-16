import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { BACKGROUNDCOLOR, DARK_GREEN, Images } from '../../constants';
import useUserStore from '../../store/userStore';

const Start: React.FC<any> = ({ navigation }) => {
  const { fetchUserProfile, isLoading, error, user } = useUserStore();

  useEffect(() => {
    if (user) {
      navigation.navigate('ChooseLanguage');
    }
  }, [user]);

  // Simulate RFID scan for testing
  const testRFIDScan = () => {
    const testRFID = 'RFID123456';
    console.log('Test RFID:', testRFID, 'fetchUserProfile');
    fetchUserProfile(testRFID);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: BACKGROUNDCOLOR }]}>
        <ActivityIndicator size="large" color={DARK_GREEN} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={styles.backImageView}
      imageStyle={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Image style={styles.imageStyle} source={Images.ic_welcomeScreen} />
        <Text style={styles.title}>Please scan your RFID card</Text>

        {/* Test button for development - remove in production */}
        <Text style={styles.testButton} onPress={testRFIDScan}>
          Test RFID Scan
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
  },
  imageStyle: {
    width: 316,
    height: 240,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
    marginTop: 40,
  },
  loadingText: {
    fontSize: 18,
    color: DARK_GREEN,
    marginTop: 20,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  testButton: {
    marginTop: 30,
    color: DARK_GREEN,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Start;
