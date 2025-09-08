import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
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

const { width, height } = Dimensions.get('window');

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

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height * 0.3)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (!billStatus) {
      // Start pulse animation for waiting state
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Progress animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();

      // Navigate with fade out
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          navigation.navigate('CollectMedicine');
        });
      }, 2700);

      return () => clearTimeout(timer);
    }
  }, [
    billStatus,
    navigation,
    fadeAnim,
    slideAnim,
    scaleAnim,
    backgroundOpacity,
    pulseAnim,
    progressAnim,
  ]);

  const handleViewBill = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Bill');
    });
  };

  const handleDone = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -height * 0.3,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Home');
    });
  };

  const renderWaitingContent = () => {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Animated.View
        style={[
          styles.waitingContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.lottieContainer,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <LottieView
            ref={lottieRef}
            source={require('../../assets/animation/PleaseWait.json')}
            autoPlay={true}
            loop={true}
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.title}>{Strings.theMedicineDispatched}</Text>
        <Text style={styles.subtitle}>
          Please wait while we prepare your medicine...
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[styles.progressBar, { width: progressWidth }]}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderSuccessContent = () => (
    <Animated.View
      style={[
        styles.successContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.thankYouContainer}>
        <Animated.View
          style={[
            styles.checkmarkContainer,
            {
              transform: [
                {
                  rotate: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>

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
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.backgroundImage, { opacity: backgroundOpacity }]}
        source={Images.ic_backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        {billStatus ? renderSuccessContent() : renderWaitingContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  // Waiting state styles
  waitingContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lottieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: DARK_GREEN,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: DARK_GREEN,
    opacity: 0.8,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 3,
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
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
  },
  thankYouTitle: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    color: DARK_GREEN,
    marginBottom: 10,
    letterSpacing: 1,
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
    lineHeight: 26,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default MedicineDispatched;
