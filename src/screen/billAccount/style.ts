import { StyleSheet } from 'react-native';
import { DARK_GREEN, PRIMARY_COLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#EAF6F4',
    paddingHorizontal: 20,
  },
  backImageView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  subContainer: {
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
