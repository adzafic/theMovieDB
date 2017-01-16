import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ViewPagerAndroid
} from 'react-native';
import _ from 'lodash';
import { POSTER_DETAIL_PATH , getRequestTv } from './../../config/path';

export default class Seasons extends Component {
  constructor(props){
    super(props);
    this.state={
      seasons: null,
    };
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    let url = getRequestTv(this.props.id);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          seasons: responseData.seasons,
        });
      });
      console.log(url);
  }

  renderSingleView(obj){
    let {
      season_number,poster_path,episode_count
    }= obj;
    return(
      <View style={styles.season} key={season_number}>
        <Image style={styles.poster}  elevation={5} source={{uri:POSTER_DETAIL_PATH + poster_path}}/>
        <View style={styles.justify}>
          <Text style={styles.textAlign}>Sesion: {season_number}</Text>
          <Text style={styles.textAlign}>Nuemro Episodios {episode_count}</Text>
        </View>
      </View>
    );
  }

  render(){

    let SeasonsView = _.map(this.state.seasons,this.renderSingleView);
    return (
      <ViewPagerAndroid
        style={styles.pager}
        initialPage={0}>
          {SeasonsView}
        </ViewPagerAndroid>
    );
  }
}

const styles= StyleSheet.create({
  poster:{
    backgroundColor: '#000000',
    height: 225,
    width: 150,
  },
  pager:{
    flex:1,
    height:300,
    width: 650,
  },
  season:{
    flex:1,
    flexDirection:'row',
  },
  justify:{
    padding:10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textAlign:{
    textAlign:'right',
  },
});
