import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Images, Strings } from '../../constants';
import { BACKGROUNDCOLOR, DARK_GREEN } from '../../constants';
import CommonPopup from '../../component/commonPopup';

const CollectMedicine: React.FC<any> = ({ navigation }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(true);

  useEffect(() => {
    const hidePopupTimer = setTimeout(() => {
      setShowSuccessPopup(false);
    }, 1000);

    const navigationTimer = setTimeout(() => {
      // Use replace instead of navigate
      navigation.replace('MedicineDispatched', { billStatus: true });
    }, 1500);

    return () => {
      clearTimeout(hidePopupTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.backImageView}
      imageStyle={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={Images.ic_whiteImg} />
        <Text style={styles.title}>{Strings.collectYourMedicine}</Text>
      </View>

      <CommonPopup
        visible={showSuccessPopup}
        title="Transaction Successful"
        icon={Images.ic_chekedIcon}
        onClose={() => setShowSuccessPopup(false)}
        onConfirm={() => setShowSuccessPopup(false)}
        showCancel={false}
      />
    </ImageBackground>
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
});
export default CollectMedicine;
