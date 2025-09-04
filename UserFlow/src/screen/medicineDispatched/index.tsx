import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
  RED,
  Strings,
} from '../../constants';
import CustomButton from '../../component/button';

const MedicineDispatched: React.FC<any> = ({ navigation, route }) => {
  const { billStatus } = route.params || {};

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!billStatus) {
      timer = setTimeout(() => {
        navigation.navigate('CollectMedicine');
      }, 3000);
    } else {
      console.log('....');
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [billStatus, navigation]);

  return (
    <ImageBackground
      style={styles.backImageView}
      imageStyle={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      {billStatus ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{Strings.thankYouCustomerName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              label={Strings.viewBill}
              color={RED}
              onPress={() => navigation.navigate('Bill')}
            />
            <CustomButton
              label={Strings.done}
              color={PRIMARY_COLOR}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Image style={styles.imageStyle} source={Images.ic_pleaseWait} />
          <Text style={styles.title}>{Strings.theMedicineDispatched}</Text>
        </View>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  subContainer: {
    flex: 0.9,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
    marginTop: 20,
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
});
export default MedicineDispatched;
