
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { loadVacancies, loadNext } from '../reducers/reducer';
import styles from './styles';
import ListItem from './ListItem';
import SearchPannel from './SearchPannel';

type Props = {};
class HomeComponent extends Component<Props> {

  componentDidMount() {
    this.props.loadVacancies();
  }

  render() {
    let emptyRes = !this.props.loading && this.props.q && this.props.vacs.length ===0;
    return (
      <View style={styles.container}>
        <SearchPannel
          count={this.props.count}
          onStartSearch={ (q) => this.props.loadVacancies(q) }/>

        { !emptyRes && !this.props.error &&
          <FlatList
            style={{flex:1}}
            data={this.props.vacs}
            onEndReached={ () => this.props.loadNext() }
            keyExtractor={ item => item.id.toString() }
            refreshing={this.props.loading}
            onRefresh={ () => this.props.loadVacancies() }
            onEndReachedThreshold={0.5}
            renderItem={ ({ item }) => <ListItem item={item}/>}
          />}

          { emptyRes && !this.props.error &&
            <Text style={styles.emptyText}>
              Ничего не найдено
            </Text>}

            {this.props.error &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Что-то пошло не так... :(</Text>
              <Button title={"Попробовать еще раз."}
              onPress={()=> this.props.loadVacancies(this.props.q) }/>
            </View>}

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacs: state.vacs,
    count: state.count,
    loading: state.loading,
    q: state.q,
    error: state.error
  };
};

const mapDispatchToProps = {
  loadVacancies,
  loadNext
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
