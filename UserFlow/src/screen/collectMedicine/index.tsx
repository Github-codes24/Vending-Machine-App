import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Images, Strings, BACKGROUNDCOLOR, DARK_GREEN } from '../../constants';
import CommonPopup from '../../component/commonPopup';

interface CollectMedicineProps {
  navigation: {
    replace: (screen: string, params?: object) => void;
  };
}

const { width } = Dimensions.get('window');
const POPUP_DURATION = 3500;

const CollectMedicine: React.FC<CollectMedicineProps> = ({ navigation }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(true);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleNavigation = useCallback(() => {
    // Animate out before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('MedicineDispatched', { billStatus: true });
    });
  }, [navigation, fadeAnim, scaleAnim]);

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous subtle rotation for visual interest
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Auto navigate after duration
    const timer = setTimeout(() => {
      setShowSuccessPopup(false);
      handleNavigation();
    }, POPUP_DURATION);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, scaleAnim, rotateAnim, handleNavigation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '5deg'],
  });

  return (
    <ImageBackground
      style={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
              { rotate: spin },
            ],
          },
        ]}
      >
        <AnimatedTitle text={Strings.collectYourMedicine} />
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
    </ImageBackground>
  );
};

// Animated Title Component with stagger effect
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  const animatedValues = useRef(
    text.split('').map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        delay: index * 30, // Stagger effect
        useNativeDriver: true,
      }),
    );

    Animated.stagger(50, animations).start();
  }, [animatedValues]);

  return (
    <View style={styles.titleContainer}>
      {text.split('').map((char, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.title,
            {
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {char}
        </Animated.Text>
      ))}
    </View>
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
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: DARK_GREEN,
  },
  lottieStyle: {
    width: 80,
    height: 80,
  },
});

export default CollectMedicine;
