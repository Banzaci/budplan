import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar, Icon } from 'react-native-tab-view'; 

import Home from '../tabs/home';
import Profile from '../tabs/Profile';
import Statistics from '../tabs/Statistics';

const Home = () => (
  <Home />
);

const Profile = () => (
  <Profile />
);

const Statistics = () => (
  <Statistics />
);

export default function Navigation() {
  const [ state, setState ] = useState({
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'profile', title: 'Profile' },
      { key: 'statistics', title: 'Statistics' },
    ],
  });
  return (
    <TabView
        navigationState={ state }
        renderScene={ SceneMap({
          home: Home,
          profile: Profile,
          statistics: Statistics,
        })}
        onIndexChange={ index => setState( {...state, index } )}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar = { props => 
            <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'pink' }}
            />
        }
        style={ styles.container }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight
  },
  scene: {
    flex: 1,
  },
});
