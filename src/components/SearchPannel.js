
import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  TextInput
} from 'react-native';
import _ from 'lodash';

type Props = {};
export default class SearchPannel extends Component<Props>{

  constructor(){
    super();

    //предотвращаем поиск на каждый ввод буквы - задержка 1.5 сек
    this._debounsedRequest = _.bind(
      _.debounce( this.newRequest, 1500), this);
  }

  newRequest(q) {
    if(this.props.onStartSearch) {
      this.props.onStartSearch(q);
    }
    Keyboard.dismiss();
  }

  render(){
    return <View style={{backgroundColor:'#fff',
      paddingBottom: 10}}>
      <TextInput
        style={{fontSize:18}}
        placeholder="Поиск"
        onChangeText={(text)=>{
          this._debounsedRequest(text);
        }}
      />
      { this.props.count >0 &&
        <Text style={{color:'green', textAlign:'center'}}>
          Найдено {this.props.count} вакансий</Text> }
    </View>;
  }
}
