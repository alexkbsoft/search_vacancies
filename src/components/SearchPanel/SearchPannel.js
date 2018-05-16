
import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  TextInput
} from 'react-native';
import _ from 'lodash';
import styles from './styles';
import PropTypes from 'prop-types';

export default class SearchPannel extends Component{

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
    return <View style={styles.searchPanel}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск"
        onChangeText={(text)=>{
          this._debounsedRequest(text);
        }}
      />
      { this.props.count >0 &&
        <Text style={styles.foundCount}>
          Найдено {this.props.count} вакансий</Text> }
    </View>;
  }
}

SearchPannel.propTypes = {
  onStartSearch: PropTypes.func,
  count: PropTypes.number
};
