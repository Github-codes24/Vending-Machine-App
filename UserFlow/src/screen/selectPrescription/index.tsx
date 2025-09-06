import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
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
import useUserStore from '../../store/userStore';
import apiService from '../../services/service';

// const prescriptions = [
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
//   {
//     images: Images.ic_dummyImg,
//     id: '#0000125',
//   },
// ];

const SelectPrescription: React.FC<any> = ({ navigation }) => {
  // Move useState inside the component
  const { prescriptions, getUserPrescriptions, user, isLoading } =
    useUserStore();
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  console.log('prescriptions', prescriptions);

  const fetchPrescriptions = () => {
    if (!user?.rfid) return;
    getUserPrescriptions(user?.rfid);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

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

  // In SelectPrescription.js, check the handleOnPress function
  const handleOnPress = async (index: number) => {
    setSelectedIndex(index);
    setPopupVisible(true);

    try {
      // Make sure the ID is clean
      const prescriptionId = prescriptions[index].id;
      console.log('Selected prescription ID:', prescriptionId);

      const prescription = await apiService.getUserPrescriptionDetails(
        encodeURIComponent(prescriptionId),
      );
      console.log('Selected prescription:', prescription);
      setSelectedPrescription(prescription);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleContinue = () => {
    if (selectedIndex === -1 || !selectedPrescription) {
      Alert.alert(
        'Please select a prescription',
        'You must select a prescription before continuing.',
      );
      return;
    }

    navigation.navigate('SelectRelationship', {
      prescriptionId: prescriptions[selectedIndex].id,
      prescriptionData: selectedPrescription,
    });
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
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            </View>
          ) : (
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
          )}
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
          data={selectedPrescription}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectPrescription;
