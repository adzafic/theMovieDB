import React, { Component } from 'react';
import {
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BackButton extends Component {
  render() {
    return (
      <Icon name="arrow-back"  size={25} color="#ffffff" />
    );
  }
}
