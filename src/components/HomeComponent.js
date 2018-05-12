
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { loadVacancies } from '../reducers/reducer';

type Props = {};
class HomeComponent extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Home sweet home.
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = state => {
  return {
    vacs: state.vacs
  };
};

const mapDispatchToProps = {
  loadVacancies
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
