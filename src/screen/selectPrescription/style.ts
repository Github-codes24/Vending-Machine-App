import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN, PERSIAN_GREEN, RED } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center'
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
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  cancelBtn: {
    backgroundColor: RED,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueBtn: {
    backgroundColor: PERSIAN_GREEN,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
