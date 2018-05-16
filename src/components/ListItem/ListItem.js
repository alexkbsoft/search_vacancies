
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import styles from './styles';
moment.locale('ru');

export default class ListItem extends Component{
  formatDate(){
    return moment(this.props.item.add_date).format('MMMM Do YYYY, h:mm a')
  }
  render(){
    return <View style={styles.itemContainer}>
      <Text style={styles.itemHeader}>
        {this.props.item.header}
      </Text>
      <Text>
        { this.formatDate() }
      </Text>
      <Text style={styles.salary}>
        {this.props.item.salary}
      </Text>

    </View>;
  }
}

ListItem.propTypes = {
  item: PropTypes.object
};
