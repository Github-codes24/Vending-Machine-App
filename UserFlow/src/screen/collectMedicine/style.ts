import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
    marginTop: 20,
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});

export default styles;
