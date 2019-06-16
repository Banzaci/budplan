import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';  
import Wrapper from './src/wrapper';

const FirstRoute = () => (
  <Wrapper />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'green' }]} />
);

export default function App() {
  const [ state, setState ] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
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
      style={styles.container}
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
