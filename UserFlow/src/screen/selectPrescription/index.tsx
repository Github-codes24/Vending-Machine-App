import React, { useState } from 'react';
import { View, FlatList, ImageBackground, StyleSheet } from 'react-native';
import PrescriptionCard from '../../component/prescriptionCard';
import CustomButton from '../../component/button';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
  RED,
  Strings,
} from '../../constants';
import Header from '../../component/header';
import PrescriptionPopup from '../../component/PrescriptionPopup';
import CommonPopup from '../../component/commonPopup';

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOnPress = (index: number) => {
    setSelectedIndex(index);
    setPopupVisible(true);
  };

  const handleContinue = () => {
    navigation.navigate('ChooseRelationship');
  };

  const handleGoBack = () => {
    setIsPopupVisible(false);
    navigation.goBack();
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
          <CustomButton
            label={Strings.cancel}
            color={RED}
            onPress={() => setIsPopupVisible(true)}
          />
          <CustomButton
            label={Strings.continue}
            color={PRIMARY_COLOR}
            onPress={handleContinue}
          />
        </View>
        <PrescriptionPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          title="Prescription No.0000125"
          image={Images.ic_dummyImg}
        />
        <CommonPopup
          visible={isPopupVisible}
          title={Strings.areYouSureWantToCancelTheProcess}
          icon={Images.ic_vector}
          onClose={() => setIsPopupVisible(false)}
          onConfirm={handleGoBack}
          confirmText="YES"
          cancelText="NO"
          showCancel={true}
        />
      </ImageBackground>
    </View>
  );
};

export default SelectPrescription;

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
    paddingTop: 5, // Reduced from marginTop: 10
  },
  listContainer: {
    paddingBottom: 10, // Add some padding at bottom of list
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
    paddingVertical: 10, // Reduced from marginTop: 15
    paddingBottom: 20, // Add bottom padding for safe area
  },
});
