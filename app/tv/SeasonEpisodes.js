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

import { POSTER_DETAIL_PATH, getRequestSeason } from './../../config/path';


export default class SeasonEpisodes extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      season: null,
    };
  }

  componentDidMount(){
      this.fetchData();
  }

  fetchData(){
    let {
      season_number,
    } = this.props.route.data;
    let url = getRequestSeason(this.props.route.season_id,season_number)
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.episodes),
          season: responseData.episodes,
        });
      });
  }

  render() {

    return (
        <ListView dataSource={this.state.dataSource}
          renderRow={this.renderSingleTv.bind(this)}
          style={styles.ListView}/>
    );
  }

  renderSingleTv(tv){
    return (
        <View style={styles.container} key={tv.episode_number}>
          <Image style={styles.thumbnail}
            source={{ uri: POSTER_DETAIL_PATH + tv.still_path }} />
            <View style={styles.listData}>
              <Text>Episodio: {tv.episode_number}</Text>
              <Text>{tv.overview}</Text>
            </View>
        </View>
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
    height: 100,
    width: 150,
  },
  listData:{
    marginLeft: 20,
    flex: 1,
  }
});
