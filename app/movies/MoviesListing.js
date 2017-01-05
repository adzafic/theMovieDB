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

import { REQUEST_URL, POSTER_PATH } from './../../config/path';
import MovieDetail from './MovieDetail';




export default class MoviesListing extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      movies: null,
      page: 1,
      total_pages : 1
    };
  }

  componentDidMount(){
      this.fetchData();
  }

  fetchData(){
    fetch(`${REQUEST_URL}&page=1`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          movies: responseData.results,
          total_pages: responseData.total_pages,
        });
      });
  }

  nextPage(movie){
    this.props.toRoute({
      name: movie.title,
      component: MovieDetail,
      data: movie,
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump,
    });
  }

  endReached(){
    let newPage = this.state.page + 1;
    this.setState({
      page: newPage,
    });
    if( newPage <= this.state.total_pages){
      let oldData = this.state.movies;
      fetch(`${REQUEST_URL}&page=${newPage}`)
        .then((response) => response.json())
        .then((responseData) => {
          let data = oldData.concat(responseData.results);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            movies: data,
          });
        });
      }
  }
  _dataBlob(){
    //let newArray =
  }
  render() {
    if (!this.state.movies) {
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
        <ListView dataSource={this.state.dataSource}
          renderRow={this.renderSingleMovie.bind(this)}
          onEndReached={this.endReached.bind(this)}/>
    );
  }

  renderSingleMovie(movie){
    return (
      <TouchableHighlight style={styles.container} onPress={this.nextPage.bind(this,movie)}>
        <View style={styles.container}>
          <Image style={styles.thumbnail}
            source={{ uri: POSTER_PATH + movie.poster_path }} />
          <View style={styles.listData}>
            <Text>{movie.title}</Text>
            <Text>{this.renderShortDate(movie.release_date)}</Text>
            <Text>Vote: {movie.vote_average}</Text>
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
