import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
  RED,
  Strings,
} from '../../constants';
import CustomButton from '../../component/button';
import useUserStore from '../../store/userStore';
import LottieView from 'lottie-react-native';

interface MedicineDispatchedProps {
  navigation: any;
  route: {
    params?: {
      billStatus?: boolean;
    };
  };
}

const MedicineDispatched: React.FC<MedicineDispatchedProps> = ({
  navigation,
  route,
}) => {
  const { billStatus = false } = route.params || {};
  const { user } = useUserStore();
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!billStatus) {
      // Start the Lottie animation when component mounts
      lottieRef.current?.play();

      timer = setTimeout(() => {
        navigation.navigate('CollectMedicine');
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [billStatus, navigation]);

  const handleViewBill = () => {
    navigation.navigate('Bill');
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const renderWaitingContent = () => (
    <View style={styles.waitingContainer}>
      <LottieView
        ref={lottieRef}
        source={require('../../assets/animation/PleaseWait.json')}
        autoPlay={true}
        loop={true} // Changed to true for waiting animation
        style={styles.lottieAnimation}
        resizeMode="contain"
      />
      <Text style={styles.title}>{Strings.theMedicineDispatched}</Text>
      <Text style={styles.subtitle}>
        Please wait while we prepare your medicine...
      </Text>
    </View>
  );

  const renderSuccessContent = () => (
    <View style={styles.successContainer}>
      <View style={styles.thankYouContainer}>
        <Text style={styles.thankYouTitle}>Thank You</Text>
        <Text style={styles.userName}>{user?.name || 'Valued Customer'}</Text>
        <Text style={styles.successMessage}>
          Your medicine has been successfully dispatched!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label={Strings.viewBill}
          color={RED}
          onPress={handleViewBill}
          style={styles.button}
        />
        <CustomButton
          label={Strings.done}
          color={PRIMARY_COLOR}
          onPress={handleDone}
          style={styles.button}
        />
      </View>
    </View>
  );

  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        {billStatus ? renderSuccessContent() : renderWaitingContent()}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  backgroundImageStyle: {
    flex: 1,
  },
  // Waiting state styles
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: DARK_GREEN,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: DARK_GREEN,
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  // Success state styles
  successContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  thankYouTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: DARK_GREEN,
    marginBottom: 10,
  },
  userName: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: DARK_GREEN,
    opacity: 0.8,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default MedicineDispatched;
