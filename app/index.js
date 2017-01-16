import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  BackAndroid,
  View,
  Text,
  DrawerLayoutAndroid,
  TouchableOpacity,
  StatusBar
} from 'react-native';
//import Router from 'react-native-simple-router';
import MoviesListing from './movies/MoviesListing';
import SeriesListing from './tv/SeriesListing';
import BackButton from './components/BackButton';
import MenuButton from './components/MenuButton';

const FIRST_ROUTE = {
  index:0,
  name: 'The Movie DB',
  component: MoviesListing
}

const ROUTE_SERIE = {
  index:1,
  name: 'The Movie DB',
  component: SeriesListing
}

export default class index extends Component {
  constructor(){
    super();
    this.state= {
      drawer:null,
    }
  }

  componentDidMount(){
    this.setState({
      drawer:this.refs.drawer,
    });
  }

  renderNavigatiorScene(route, navigator){
      return React.createElement(route.component, {...this.props,...route.data,route, navigator } );
  }

  LeftButton(route, navigator, i, navState){
    if(route.index ==0){
      return (<MenuButton navigator={navigator} {...this.props} {...this.state} />);
    }else{
      return (<BackButton navigator={navigator} route={route} {...this.props}/>);
    }
  }
  RightButton(route, navigator, i, navState){

  }

  Title(route, navigator, i, navState){
    return (<Text style={styles.title}>{route.name}</Text>);
  }

  configureScene(route, routeStack){
   return Navigator.SceneConfigs.FadeAndroid;
 }

 _navigate(){
   this.refs.navigator.push(ROUTE_SERIE);
   this.refs.drawer.closeDrawer();
 }

  render() {
    var navigationView = (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={this._navigate.bind(this)}>
            <Text style={styles.drawerText}>Series</Text>
          </TouchableOpacity>

        </View>);
    return (
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}
      ref="drawer">
        <StatusBar
          backgroundColor="#01d277"
          barStyle="light-content"
          />
        <Navigator
          initialRoute={FIRST_ROUTE}
          renderScene={ this.renderNavigatiorScene }
          configureScene={ this.configureScene }
          navigationBar={
             <Navigator.NavigationBar
               routeMapper={{
                 LeftButton: this.LeftButton.bind(this),
                 RightButton: this.RightButton,
                 Title: this.Title,
               }}
               style={styles.header}
             />
          }
          ref='navigator'/>
        </DrawerLayoutAndroid>
    );
    /*
    <Navigator.NavigationBar
       style={ styles.nav }
       routeMapper={ NavigationBarRouteMapper } />
    return (
      <Router headerStyle={styles.header}
        firstRoute={FIRST_ROUTE}
        handleBackAndroid={true}
        backButtonComponent={BackButton}/>
    );*/
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#01d277',
  },
  title:{
    color:'#ffffff',
  },
  drawer:{
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerText:{
    margin: 10,
    fontSize: 15,
    textAlign: 'left',
  }
});
