import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN, PRIMARY_COLOR } from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  content: {
    flex: 0.9,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: DARK_GREEN,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default styles;
