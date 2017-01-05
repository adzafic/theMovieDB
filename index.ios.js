/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import Router from 'react-native-simple-router';
import MoviesListing from './app/movies/MoviesListing';

const FIRST_ROUTE = {
  name: 'The Movie DB',
  component: MoviesListing,
}

export default class theMovieDB extends Component {
  render() {
    return (
      <Router headerStyle={styles.header} firstRoute={FIRST_ROUTE}/>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#01d277',
  }
});

AppRegistry.registerComponent('theMovieDB', () => theMovieDB);
