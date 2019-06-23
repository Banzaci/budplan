import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar, Icon } from 'react-native-tab-view'; 

import FirstPage from '../tabs/first-page';

const FirstRoute = () => (
  <FirstPage />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'green' }]} />
);

export default function Navigation() {
  const [ state, setState ] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'Home' },
      { key: 'second', title: 'Second' },
    ],
  });
  return (
    <TabView
        navigationState={ state }
        renderScene={ SceneMap({
            first: FirstRoute,
            second: SecondRoute,
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
