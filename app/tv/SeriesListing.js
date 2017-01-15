import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';

import { REQUEST_URL, POSTER_PATH, getRequest } from './../../config/path';
import MovieDetail from './../movies/MovieDetail';




export default class SeriesListing extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      tv: null,
      page: 1,
      total_pages : 1
    };
  }

  componentDidMount(){
      this.fetchData();
  }

  fetchData(){
    let url = getRequest('tv')
    let request_url = `${url}&page=1`;
    fetch(request_url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          tv: responseData.results,
          total_pages: responseData.total_pages,
        });
      });
  }

  _navigate(tv){
    this.props.navigator.push({
      name: tv.name,
      component: MovieDetail,
      data: tv
    });
  }

  endReached(){
    let newPage = this.state.page + 1;
    this.setState({
      page: newPage,
    });
    if( newPage <= this.state.total_pages){
      let url = getRequest('tv')
      let request_url = `${url}&page=${newPage}`;
      fetch(request_url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows([...this.state.tv,...responseData.results]),
            tv: [...this.state.tv,...responseData.results],
          });
        });
      }
  }

  render() {
    if (!this.state.tv) {
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
        <ListView dataSource={this.state.dataSource}
          renderRow={this.renderSingleTv.bind(this)}
          onEndReached={this.endReached.bind(this)}
          style={styles.ListView}/>
    );
  }

  renderSingleTv(tv){
    return (
      <TouchableHighlight style={styles.container} onPress={this._navigate.bind(this,tv)}>
        <View style={styles.container}>
          <Image style={styles.thumbnail}
            source={{ uri: POSTER_PATH + tv.poster_path }} />
          <View style={styles.listData}>
            <Text>{tv.name}</Text>
            <Text>{this.renderShortDate(tv.first_air_date)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderShortDate(date){
    return date;
  }


}

const styles = StyleSheet.create({
  ListView:{
    marginTop:55,
  },
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail:{
    height: 120,
    width: 80,
  },
  listData:{
    marginLeft: 20,
    flex: 1,
  }
});
