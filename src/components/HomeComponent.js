
import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { loadVacancies, loadNext } from '../reducers/reducer';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

type Props = {};
class HomeComponent extends Component<Props> {

  constructor(){
    super();

    //предотвращаем поиск на каждый ввод буквы - задержка 1.5 сек
    this._debounsedRequest = _.bind(
      _.debounce( this.newRequest, 1500), this);
  }

  componentDidMount(){
    this.props.loadVacancies();
  }

  newRequest(q) {
    this.props.loadVacancies(q);
    Keyboard.dismiss();
  }

  render() {
    let emptyRes = !this.props.loading && this.props.q && this.props.vacs.length ===0;
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#fff',
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
        </View>

        { !emptyRes && !this.props.error &&
          <FlatList
            style={{flex:1}}
            data={this.props.vacs}
            onEndReached={ () => this.props.loadNext() }
            keyExtractor={ item => item.id.toString() }
            refreshing={this.props.loading}
            onRefresh={ () => this.props.loadVacancies() }
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => {
              return (
                  <View style={{padding:10, borderBottomWidth:1}}>
                    <Text style={{color:'black',
                      fontSize:18,
                      paddingBottom:5
                    }}>
                      {item.header}
                    </Text>
                    <Text>{ moment(item.add_date).format('MMMM Do YYYY, h:mm a')}</Text>
                    <Text style={{fontSize:20}}>{item.salary}</Text>

                  </View>
                )}
              }
          />}

          { emptyRes && !this.props.error && <Text style={styles.emptyText}>
            Ничего не найдено</Text>}

            {this.props.error &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Что-то пошло не так... :(</Text>
              <Button title={"Попробовать еще раз."}
              onPress={()=> this.props.loadVacancies(this.props.q)}/>
            </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
