import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Images, Strings, RED, PRIMARY_COLOR } from '../../constants';
import styles from './style'
import LargeButton from '../../component/largeButton'
import CustomButton from '../../component/button'

const Home: React.FC<any> = ({ navigation }) => {

  const handleContinue = () => {
    navigation.navigate('SelectPrescription');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImageView}
        source={Images.ic_backgroundImage}
      >
        <View style={styles.headerIcon}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            {Strings.welcomeGourab}
          </Text>
          <Text style={styles.subtitleText}>
            {Strings.howCanWeHelpYouToday}
          </Text>

          <LargeButton
            label={Strings.checkBalance}
            selected={true}
            onPress={() => console.log('Check Balance Pressed')}
          />
          <LargeButton
            label={Strings.prescriptionSelection}
            selected={false}
            onPress={() => console.log('Prescription Selection Pressed')}
          />
           </View>

          <View style={styles.actionButtons}>
            <CustomButton
              label={Strings.cancel}
              color={RED}
              onPress={() => console.log('Cancelled')}
            />
            <CustomButton
              label={Strings.continue}
              color={PRIMARY_COLOR}
              onPress={handleContinue}
            />
          </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
