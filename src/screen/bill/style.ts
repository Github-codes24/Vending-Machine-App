import { StyleSheet } from 'react-native';
import { DARK_GREEN, PERSIAN_GREEN, PRIMARY_COLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EAF6F4',
    justifyContent: 'center'
  },
  subContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color: DARK_GREEN,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 24,
    color: PRIMARY_COLOR,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
