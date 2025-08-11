import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN } from '../../constants';

export default StyleSheet.create({
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
  welcomeText: {
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    color: DARK_GREEN,
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    color: DARK_GREEN,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});
