import React, { Component } from 'react';
import {
  View
} from 'react-native';
import HomeComponent from './src/components/HomeComponent';
import { Provider } from 'react-redux';
import configureStore from "./src/store/configureStore";
import styles from './src/styles.js';

//создаем хранилище
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <HomeComponent/>
        </View>
      </Provider>
    );
  }
}
