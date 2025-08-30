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
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
  },
  imageStyle: {
    width: 316,
    height: 240,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
    marginTop: 40,
  },
});

export default styles;
