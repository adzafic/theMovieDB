/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  DrawerLayoutAndroid,
  View,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import Router from 'react-native-simple-router';
import MoviesListing from './app/movies/MoviesListing';
import SeriesListing from './app/tv/SeriesListing';
import BackButton from './app/components/BackButton';
import MenuButton from './app/components/MenuButton';

const FIRST_ROUTE = {
  name: 'The Movie DB',
  component: MoviesListing,
  leftCorner:MenuButton
}

export default class theMovieDB extends Component {

  _navigate(component){
   this.refs.navigator.toRoute({
     name: "Series",
     component: SeriesListing,
     data: '',
     sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump,
   });
   this.refs.drawer.closeDrawer();
 }

 openDrawer(){
   console.log(this);
   this.refs.drawer.openDrawer();
 }
  render() {
    var navigationView = (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={this._navigate.bind(this,SeriesListing)}>
            <Text style={styles.drawerText}>Series</Text>
          </TouchableOpacity>

        </View>);
    return (
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}
      ref="drawer">
        <Router headerStyle={styles.header}
          firstRoute={FIRST_ROUTE}
          handleBackAndroid={true}
          backButtonComponent={BackButton}
          ref="navigator"
          customAction={this.openDrawer.bind(this)}/>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#01d277',
  }
});

AppRegistry.registerComponent('theMovieDB', () => theMovieDB);
