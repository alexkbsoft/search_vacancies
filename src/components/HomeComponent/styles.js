import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  flatList:{
    flex:1
  },
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
  }
});
