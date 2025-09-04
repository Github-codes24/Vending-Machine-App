import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PrescriptionCard from '../../component/prescriptionCard';
import CustomButton from '../../component/button';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
  Strings,
} from '../../constants';
import Header from '../../component/header';
import PrescriptionPopup from '../../component/PrescriptionPopup';
import CancelButton from '../../component/button/cancelButton';

const prescriptions = [
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
  {
    images: Images.ic_dummyImg,
    id: '#0000125',
  },
];

const SelectPrescription: React.FC<any> = ({ navigation }) => {
  // Move useState inside the component
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [popupVisible, setPopupVisible] = useState(false);

  // Add useEffect for landscape detection
  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription?.remove();
  }, []);

  const handleOnPress = (index: number) => {
    setSelectedIndex(index);
    setPopupVisible(true);
  };

  const handleContinue = () => {
    navigation.navigate('ChooseRelationship');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
        resizeMode="stretch"
      >
        <Header
          backImageSource={Images.ic_left}
          onBack={() => navigation.goBack()}
          title={Strings.selectPrescription}
        />

        <View style={styles.content}>
          <FlatList
            data={prescriptions}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
              <PrescriptionCard
                id={item.id}
                image={item.images}
                selected={index === selectedIndex}
                onPress={() => handleOnPress(index)}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CancelButton
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          />
        </View>

        <PrescriptionPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          title="Prescription No.0000125"
          image={Images.ic_dummyImg}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  listContainer: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: DARK_GREEN,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 20,
    gap: 10, // Add gap between buttons
  },
  portraitButton: {
    width: 150,
    flex: 1,
  },
  landscapeButton: {
    width: 100,
    flex: 1,
  },
});

export default SelectPrescription;
