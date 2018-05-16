
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Button
} from 'react-native';
import styles from './styles';
import ListItem from '../ListItem';
import SearchPannel from '../SearchPanel';
import PropTypes from 'prop-types';
import {startLoading, loadPage} from './actions';

export default class HomeComponent extends Component {

  componentDidMount() {
    this.props.dispatch( startLoading() );
  }

  render() {
    let emptyRes = !this.props.loading && this.props.q && this.props.vacs.length ===0;
    return (
      <View style={styles.container}>
        <SearchPannel
          count={this.props.count}
          onStartSearch={ (q) => this.props.dispatch( startLoading(q) ) }/>

        { !emptyRes && !this.props.error &&
        <FlatList
          style={styles.flatList}
          data={this.props.vacs}
          onEndReached={ () => {
            if(this.props.loading) return;

            this.props.dispatch( loadPage() )
          } }
          keyExtractor={ item => item.id.toString() }
          refreshing={this.props.loading}
          onRefresh={ () => this.props.dispatch( startLoading(this.props.q) ) }
          onEndReachedThreshold={0.5}
          renderItem={ ({ item }) => <ListItem item={item}/>}
        />}

        { emptyRes && !this.props.error ?
        <Text style={styles.emptyText}>
          Ничего не найдено
        </Text> : null}

        {this.props.error?
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Что-то пошло не так... :(</Text>
            <Button title={"Попробовать еще раз."}
                    onPress={()=> this.props.dispatch( startLoading(this.props.q) ) }/>
          </View> : null}

      </View>
    );
  }
}

HomeComponent.propTypes = {
  loadVacancies: PropTypes.func,
  loading: PropTypes.bool,
  q: PropTypes.string,
  vacs: PropTypes.array,
  count: PropTypes.number,
  error: PropTypes.bool,
  loadNext: PropTypes.func,
  dispatch: PropTypes.func
};
