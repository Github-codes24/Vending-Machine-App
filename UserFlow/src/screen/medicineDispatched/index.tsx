import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import CustomButton from '../../component/button'

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
            resizeMode="stretch">
            {
                billStatus ?
                    <View style={{flex:1,justifyContent:'center'}}>
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
                                onPress={() => console.log('....')}
                            />
                        </View>
                    </View> :
                    <View style={styles.container}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.ic_pleaseWait}
                        />
                        <Text style={styles.title}>{Strings.theMedicineDispatched}</Text>
                    </View>
            }
        </ImageBackground>
    )
}
export default MedicineDispatched