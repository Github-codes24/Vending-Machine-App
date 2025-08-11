import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN, PERSIAN_GREEN, PRIMARY_COLOR, WHITE } from '../../constants';

const styles = StyleSheet.create({
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 10,
    elevation: 4,
    borderColor: DARK_GREEN,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  value: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 6,
    color: '#222',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  tableText: {
    fontWeight: '600',
    color: '#555',
  },
  rowText: {
    color: '#444',
  },
  rowTextBold: {
    fontWeight: '700',
    color: '#000',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
});
export default styles;
