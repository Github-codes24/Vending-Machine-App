import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Images, Strings } from '../../constants'
import styles from './style'

const CollectMedicine: React.FC<any> = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
           navigation.navigate('MedicineDispatched', { billStatus: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            style={styles.backImageView}
            imageStyle={styles.backImageView}
            source={Images.ic_backgroundImage}
            resizeMode="stretch">
            <View style={styles.container}>
                <Image
                    style={styles.imageStyle}
                    source={Images.ic_whiteImg}
                />
                <Text style={styles.title}>{Strings.collectYourMedicine}</Text>
            </View>
        </ImageBackground>
    )
}
export default CollectMedicine