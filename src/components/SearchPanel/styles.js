import {
  StyleSheet
} from 'react-native';

const colorWhite = '#fff';
const colorGreen = 'green';

export default StyleSheet.create({
  searchPanel:{
    backgroundColor: colorWhite,
    paddingBottom: 10
  },
  searchInput:{
    fontSize:18
  },
  foundCount:{
    color: colorGreen,
    textAlign:'center'
  }
});
