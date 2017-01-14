import React, { Component } from 'react';
import {
  Navigator,
  BackAndroid,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BackButton extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress',()=>{
      //
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  onPress(){
    this.props.navigator.jumpBack();
  }

  render() {
    return (
      <Icon name="arrow-back"  size={25} color="#ffffff" onPress={this.onPress.bind(this)} />
    );
  }

}
