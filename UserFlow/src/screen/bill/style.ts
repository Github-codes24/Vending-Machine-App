import { StyleSheet } from 'react-native';
import { BACKGROUNDCOLOR, DARK_GREEN, PRIMARY_COLOR, WHITE } from '../../constants';

const styles = StyleSheet.create({
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  container: {
    padding: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
  subContainer: {
    flex: 0.9,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 15,
    borderColor: DARK_GREEN,
    borderWidth:0.5
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'70%',
    marginTop:7,
  },
  label: {
    color: DARK_GREEN,
    fontWeight: '500',
    fontSize: 10,
  },
  value: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: '300',
  },
  lineView : {
    height:1,
    marginVertical:12,
    backgroundColor:PRIMARY_COLOR
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 10,
    color: DARK_GREEN,
  },
  infoGrid: {
   paddingHorizontal:15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor:'#D9D9D9',
    paddingVertical: 5,
    marginTop: 7,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomColor:'#D9D9D9',
  },
  tableText: {
    fontWeight: '500',
    color: DARK_GREEN,
    fontSize:10,
    textAlign: 'center' 
  },
  rowText: {
    fontWeight: '400',
    color: DARK_GREEN,
    fontSize:10,
    textAlign: 'center' 
  },
  rowTextBold: {
    fontWeight: '400',
    color: DARK_GREEN,
    fontSize:10,
    textAlign: 'center' 
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom:35,
  },
  buttonText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
});
export default styles;
