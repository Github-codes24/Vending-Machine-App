import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import CustomButton from '../../component/button'

const BillAccount: React.FC<any> = ({ navigation }) => {

    const [currentBalance, setCurrentBalance] = useState<string | null>('5000');
    const [billingAmount, setBillingAmount] = useState<string | null>('5000');

    const handleContinue = () => {
        navigation.navigate('Bill');
    };

    return (
        <ImageBackground
            style={styles.backImageView}
            source={Images.ic_backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={{ flex: 0.9, justifyContent: 'center' }}>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>{Strings.currentBalance}</Text>
                        <Text style={styles.subTitle}>Rs {currentBalance}</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>{Strings.billingAmount}</Text>
                        <Text style={styles.subTitle}>Rs {billingAmount}</Text>
                    </View>
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
            </View>
        </ImageBackground>
    )
}
export default BillAccount