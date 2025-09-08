import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Images,
  Strings,
  BACKGROUNDCOLOR,
  DARK_GREEN,
  PRIMARY_COLOR,
} from '../../constants';
import CommonPopup from '../../component/commonPopup';
import LottieView from 'lottie-react-native';

interface CollectMedicineProps {
  navigation: {
    replace: (screen: string, params?: object) => void;
  };
}

const { width, height } = Dimensions.get('window');
const POPUP_DURATION = 3500;

const CollectMedicine: React.FC<CollectMedicineProps> = ({ navigation }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(1.2)).current;
  const medicineIconScale = useRef(new Animated.Value(0)).current;
  const medicineIconRotate = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  const handleNavigation = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('MedicineDispatched', { billStatus: true });
    });
  }, [navigation, fadeAnim, scaleAnim]);

  useEffect(() => {
    // Entry animations sequence
    Animated.sequence([
      // First: Background and main content fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Then: Medicine icon animation
      Animated.parallel([
        Animated.spring(medicineIconScale, {
          toValue: 1,
          tension: 40,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(medicineIconRotate, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Start continuous animations
      // Shimmer effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Subtle rotation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    // Show popup after initial animation
    const popupTimer = setTimeout(() => {
      setShowSuccessPopup(true);
    }, 1000);

    // Auto navigate
    const navTimer = setTimeout(() => {
      setShowSuccessPopup(false);
      handleNavigation();
    }, POPUP_DURATION);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(navTimer);
    };
  }, [
    fadeAnim,
    slideAnim,
    backgroundScale,
    medicineIconScale,
    medicineIconRotate,
    shimmerAnim,
    rotateAnim,
    handleNavigation,
  ]);

  const spin = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-3deg', '0deg', '3deg'],
  });

  const medicineRotation = medicineIconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            opacity: fadeAnim,
            transform: [{ scale: backgroundScale }],
          },
        ]}
        source={Images.ic_backgroundImage}
        resizeMode="cover"
      />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { rotate: spin }],
          },
        ]}
      >
        {/* Medicine Icon Animation */}
        <Animated.View
          style={[
            styles.medicineIconContainer,
            {
              transform: [
                { scale: medicineIconScale },
                { rotate: medicineRotation },
              ],
            },
          ]}
        >
          <View style={styles.medicineIcon}>
            <Text style={styles.medicineIconText}>💊</Text>
          </View>

          {/* Shimmer Effect Overlay */}
          <Animated.View
            style={[styles.shimmerOverlay, { opacity: shimmerOpacity }]}
          />
        </Animated.View>

        {/* Animated Title */}
        <AnimatedTitle text={Strings.collectYourMedicine} />

        {/* Collection Instructions */}
        <Animated.View
          style={[
            styles.instructionsContainer,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.8],
              }),
            },
          ]}
        >
          <Text style={styles.instructionText}>
            Your medicine is ready for collection
          </Text>
          <Text style={styles.subInstructionText}>
            Please proceed to the counter
          </Text>
        </Animated.View>

        {/* Animated Dots Loader */}
        <AnimatedDotsLoader />
      </Animated.View>

      <CommonPopup
        visible={showSuccessPopup}
        title="Transaction Successful"
        onClose={handleNavigation}
        onConfirm={handleNavigation}
        showCancel={false}
        lottieSource={require('../../assets/animation/Success.json')}
        lottieStyle={styles.lottieStyle}
      />
    </View>
  );
};

// Animated Title Component with wave effect
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  const animatedValues = useRef(
    text.split('').map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) =>
      Animated.sequence([
        Animated.delay(index * 30),
        Animated.spring(animValue, {
          toValue: 1,
          tension: 50,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
    );

    Animated.parallel(animations).start();
  }, [animatedValues]);

  return (
    <View style={styles.titleContainer}>
      {text.split('').map((char, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.titleChar,
            {
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
                {
                  scale: animatedValues[index].interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.2, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {char === ' ' ? ' ' : char}
        </Animated.Text>
      ))}
    </View>
  );
};

// Animated Dots Loader Component
const AnimatedDotsLoader: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDotAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
    };

    Animated.parallel([
      createDotAnimation(dot1, 0),
      createDotAnimation(dot2, 150),
      createDotAnimation(dot3, 300),
    ]).start();
  }, [dot1, dot2, dot3]);

  const renderDot = (animValue: Animated.Value, key: string) => (
    <Animated.View
      key={key}
      style={[
        styles.dot,
        {
          opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
            {
              scale: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1.2],
              }),
            },
          ],
        },
      ]}
    />
  );

  return (
    <View style={styles.dotsContainer}>
      {renderDot(dot1, 'dot1')}
      {renderDot(dot2, 'dot2')}
      {renderDot(dot3, 'dot3')}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  medicineIconContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  medicineIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  medicineIconText: {
    fontSize: 60,
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleChar: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: DARK_GREEN,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '500',
    color: DARK_GREEN,
    marginBottom: 8,
  },
  subInstructionText: {
    fontSize: 16,
    fontWeight: '400',
    color: DARK_GREEN,
    opacity: 0.7,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    height: 30,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 5,
  },
  lottieStyle: {
    width: 100,
    height: 100,
  },
});

export default CollectMedicine;
