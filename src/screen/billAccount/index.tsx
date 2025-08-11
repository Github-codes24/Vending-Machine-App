import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import CustomButton from '../../component/button'
import Header from '../../component/header'

const BillAccount: React.FC<any> = ({ navigation }) => {

    const [currentBalance, setCurrentBalance] = useState<string | null>('15,000');
    const [billingAmount, setBillingAmount] = useState<string | null>('5,000');

    const handleContinue = () => {
        navigation.navigate('Bill');
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
                    title=''
                />
                <View style={styles.content}>
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
            </ImageBackground>
        </View>
    )
}
export default BillAccount