import React, { Component } from 'react';
import {
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MenuButton extends Component {
  render() {
    return (
      <Icon name="menu"  size={25} color="#ffffff" />
    );
  }
}
