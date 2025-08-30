import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  subContainer: {
    flex: 0.9,
    paddingHorizontal: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
});

export default styles;
