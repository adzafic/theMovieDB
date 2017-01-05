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
import BackButton from './app/components/BackButton';
import MenuButton from './app/components/MenuButton';

const FIRST_ROUTE = {
  name: 'The Movie DB',
  component: MoviesListing,
  leftCorner:MenuButton
}

export default class theMovieDB extends Component {
  render() {
    return (
      <Router headerStyle={styles.header}
        firstRoute={FIRST_ROUTE}
        handleBackAndroid={true}
        backButtonComponent={BackButton}/>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#01d277',
  }
});

AppRegistry.registerComponent('theMovieDB', () => theMovieDB);
