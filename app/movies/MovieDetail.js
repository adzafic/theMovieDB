import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { BACKDROP_PATH, POSTER_DETAIL_PATH } from './../../config/path';

export default class MovieDetail extends Component {
  render(){
    var {
      title,
      backdrop_path ,
      poster_path,
      overview
    } = this.props.route.data;

    return (
      <ScrollView style={styles.ScrollView}>
        <Image style={styles.backdrop}  source={{uri: BACKDROP_PATH + backdrop_path }} />
        <View style={styles.description}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.overview} >{overview}</Text>
        </View>
        <Image style={styles.poster}  elevation={5} source={{uri:POSTER_DETAIL_PATH + poster_path}}/>
      </ScrollView>
    );
  }
}

const styles= StyleSheet.create({
  ScrollView:{
    marginTop:55,
  },
  backdrop:{
    height: 230,
    marginBottom: 30,
  },
  title:{
    fontSize: 18,
    fontWeight : 'bold',
    marginBottom: 10,
  },
  description:{
    padding:20,
  },
  overview:{
    justifyContent:'space-around',
    textAlign: 'justify',
  },
  poster:{
    position: 'absolute',
    backgroundColor: '#000000',
    top: 40,
    left: 20,
    height: 225,
    width: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    overflow: 'visible',
  },
});
