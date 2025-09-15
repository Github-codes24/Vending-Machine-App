import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import PrescriptionCard from '../../component/prescriptionCard';
import CustomButton from '../../component/button';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
} from '../../constants';
import Header from '../../component/header';
import PrescriptionPopup from '../../component/PrescriptionPopup';
import CancelButton from '../../component/button/cancelButton';
import useUserStore from '../../store/userStore';
import apiService from '../../services/service';
import Strings from '../../constants/LanguageStrings';

const SelectPrescription: React.FC<any> = ({ navigation }) => {
  const { prescriptions, getUserPrescriptions, user, isLoading } =
    useUserStore();
  const [isLandscape, setIsLandscape] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const fetchPrescriptions = () => {
    if (!user?.rfid) return;
    getUserPrescriptions(user?.rfid);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription?.remove();
  }, []);

  const handleOnPress = async (index: number) => {
    setSelectedIndex(index);
    setPopupVisible(true);

    try {
      const prescriptionId = prescriptions[index].id;
      const prescription = await apiService.getUserPrescriptionDetails(
        encodeURIComponent(prescriptionId),
      );
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

  // Enhanced Prescription Card Renderer
  const renderPrescriptionCard = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const isSelected = index === selectedIndex;

    return (
      <PrescriptionCard
        id={item.id}
        image={Images.ic_dummyImg}
        selected={isSelected}
        onPress={() => handleOnPress(index)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
        resizeMode="stretch"
      >
        {!isLandscape && (
          <Header
            backImageSource={Images.ic_left}
            onBack={() => navigation.goBack()}
            title={Strings.selectPrescription}
          />
        )}

        <View style={[styles.content, isLandscape && styles.landscapeContent]}>
          {isLandscape && (
            <Text style={styles.landscapeTitle}>
              {Strings.selectPrescription}
            </Text>
          )}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            </View>
          ) : (
            <FlatList
              data={prescriptions}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.listContainer,
                isLandscape && styles.landscapeListContainer,
              ]}
              renderItem={renderPrescriptionCard}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CancelButton
            style={isLandscape ? styles.landscapeButton : styles.portraitButton}
          />

          {isLandscape && (
            <View style={styles.rightButtons}>
              <CustomButton
                label="Back"
                color={PRIMARY_COLOR}
                outlined={true}
                onPress={() => navigation.goBack()}
                style={styles.landscapeButton}
              />
              <CustomButton
                label={Strings.continue}
                color={PRIMARY_COLOR}
                onPress={handleContinue}
                style={styles.landscapeButton}
              />
            </View>
          )}

          {!isLandscape && (
            <CustomButton
              label={Strings.continue}
              color={PRIMARY_COLOR}
              onPress={handleContinue}
              style={styles.portraitButton}
            />
          )}
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
  landscapeContent: {
    paddingTop: 40,
  },
  landscapeTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: DARK_GREEN,
  },
  listContainer: {
    paddingBottom: 10,
  },
  landscapeListContainer: {
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    gap: 14,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 14,
  },
  portraitButton: {
    width: 150,
  },
  landscapeButton: {
    width: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectPrescription;
