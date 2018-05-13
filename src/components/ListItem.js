
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

type Props = {};
export default class ListItem extends Component<Props>{
  render(){
    return <View style={{padding:10, borderBottomWidth:1}}>
      <Text style={{color:'black',
        fontSize:18,
        paddingBottom:5
      }}>
        {this.props.item.header}
      </Text>
      <Text>
        { moment(this.props.item.add_date).format('MMMM Do YYYY, h:mm a')}
      </Text>
      <Text style={{fontSize:20}}>
        {this.props.item.salary}
      </Text>

    </View>;
  }
}
