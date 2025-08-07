import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { PERSIAN_GREEN, WHITE } from '../../constants';

type LanguageButtonProps = {
    label: string;
    selected?: boolean;
    onPress: () => void;
};

const LargeButton: React.FC<LanguageButtonProps> = ({ label, selected = false, onPress }) => {

    return (
        <Pressable
            style={[styles.button, selected && styles.selected]}
            onPress={onPress}
        >
            <Text style={[styles.text, selected && styles.selectedText]}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: PERSIAN_GREEN,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 6,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: PERSIAN_GREEN,
    },
    text: {
        color: PERSIAN_GREEN,
        fontSize: 16,
        fontWeight :600,
    },
    selectedText: {
        color: WHITE,
    },
});

export default LargeButton;
