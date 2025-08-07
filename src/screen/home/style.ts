import { StyleSheet } from 'react-native';
import { DARK_GREEN } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backImageView: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerIcon: {
    marginTop: 20,
    marginLeft: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
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
    color: '#444',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
