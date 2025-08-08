import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import PrescriptionCard from '../../component/prescriptionCard';
import styles from './style';
import CustomButton from '../../component/button';
import { PRIMARY_COLOR, RED, Strings } from '../../constants';

const prescriptions = Array(8).fill({ id: '#0000125' });

const SelectPrescription: React.FC<any> = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

    const handleContinue = () => {
        navigation.navigate('ChooseRelationship');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Strings.selectPrescription}</Text>
            <FlatList
                data={prescriptions}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <PrescriptionCard
                        id={item.id}
                        selected={index === selectedIndex}
                        onPress={() => setSelectedIndex(index)}
                    />
                )}
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    label={Strings.cancel}
                    color={RED}
                    onPress={() => setSelectedIndex(null)}
                />
                <CustomButton
                    label={Strings.continue}
                    color={PRIMARY_COLOR}
                    onPress={handleContinue}
                />
            </View>
        </View>
    );
};

export default SelectPrescription;
