import {
    View,
    Text,
    Modal,
    StyleSheet,
    Pressable,
    Image,
    ImageSourcePropType,
} from 'react-native';
import { Images, PRIMARY_COLOR, WHITE } from '../../constants';
interface CommonPopupProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    image: ImageSourcePropType;
}

const PrescriptionPopup: React.FC<CommonPopupProps> = ({
    visible,
    onClose,
    title,
    image
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.headerView}>
                        <Text style={styles.title}>{title}</Text>
                        <Pressable style={styles.iconView} onPress={onClose}>
                            <Image source={Images.ic_cross} style={styles.icon} />
                        </Pressable>
                    </View>
                    <Image source={image} style={styles.ImageView} />
                </View>
            </View>
        </Modal>
    );
};

export default PrescriptionPopup;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    iconView: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: WHITE,
    },
    ImageView: {
        width: 300,
        height: 357,
        marginTop: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});
