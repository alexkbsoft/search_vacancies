import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
  TextInput,
  Button
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  emptyText:{
    fontSize:18,
    textAlign:'center'
  },
  errorText: {
    textAlign:'center',
    marginVertical:10,
    fontSize: 20
  },
  errorContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  itemHeader:{
    color:'black',
    fontSize:18,
    paddingBottom:5
  }
});
