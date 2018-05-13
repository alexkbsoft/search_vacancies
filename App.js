import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeComponent from './src/components/HomeComponent';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from './src/reducers/reducer';
import { root_saga } from "./src/sagas";
import createSagaMiddleware from "redux-saga";

//создаем хранилище и подключаем сагу
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(root_saga);

type Props = {};
export default class App extends Component<Props> {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
