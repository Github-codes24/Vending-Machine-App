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
    justifyContent :'center'
  },
  subContainer : {
    flex : 0.9,
    justifyContent :'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    color : DARK_GREEN,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
