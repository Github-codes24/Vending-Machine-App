import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Images, PRIMARY_COLOR, RED, Strings } from '../../constants'
import styles from './style'
import CustomButton from '../../component/button'
import Header from '../../component/header'
import CommonPopup from '../../component/commonPopup'

const BillAccount: React.FC<any> = ({ navigation }) => {

    const [currentBalance, setCurrentBalance] = useState<string | null>('15,000');
    const [billingAmount, setBillingAmount] = useState<string | null>('5,000');
    const [popupVisible, setPopupVisible] = useState(false);

    const handleContinue = () => {
        navigation.navigate('MedicineDispatched');
    };

    const handleGoBack = () => {
        setPopupVisible(false)
        navigation.goBack();
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
                        onPress={() => setPopupVisible(true)}
                    />
                    <CustomButton
                        label={Strings.continue}
                        color={PRIMARY_COLOR}
                        onPress={handleContinue}
                    />
                </View>
                <CommonPopup
                    visible={popupVisible}
                    title={Strings.areYouSureWantToCancelTheProcess}
                    icon={Images.ic_vector}
                    onClose={() => setPopupVisible(false)}
                    onConfirm={handleGoBack}
                    confirmText="YES"
                    cancelText="NO"
                    showCancel={true}
                />
            </ImageBackground>
        </View>
    )
}
export default BillAccount