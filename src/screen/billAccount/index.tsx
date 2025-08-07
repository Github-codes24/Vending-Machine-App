import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import CustomButton from '../../component/button'

const BillAccount: React.FC<any> = ({ navigation }) => {

    const [currentBalance, setCurrentBalance] = useState<string | null>(null);
    const [billingAmount, setBillingAmount] = useState<string | null>(null);

    const handleContinue = () => {
        navigation.navigate('WelcomeScreen');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backImageView}
                source={Images.ic_backgroundImage}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>{Strings.currentBalance}</Text>
                    <Text style={styles.subTitle}>{currentBalance}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>{Strings.billingAmount}</Text>
                    <Text style={styles.subTitle}>{billingAmount}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        label={Strings.cancel}
                        color={RED}
                        onPress={() =>
                            console.log('cancle')
                        }
                    />
                    <CustomButton
                        label={Strings.continue}
                        color={PRIMARY_COLOR}
                        onPress={handleContinue}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
export default BillAccount