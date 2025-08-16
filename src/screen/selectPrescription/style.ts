import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN, PERSIAN_GREEN, RED } from '../../constants';

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
    flex: 0.895,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop :10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: DARK_GREEN,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop :15,
  },
});

export default styles;
