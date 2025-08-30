import { View, Text, ImageBackground, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Images, Strings } from '../../constants';
import styles from './style';

const Start: React.FC<any> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ChooseLanguage');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.backImageView}
      imageStyle={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>{Strings.welcome}</Text>
        <Image style={styles.imageStyle} source={Images.ic_welcomeScreen} />
        <Text style={styles.title}>{Strings.pleaseScanYourRFIDCard}</Text>
      </View>
    </ImageBackground>
  );
};
export default Start;
