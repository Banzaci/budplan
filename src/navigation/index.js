import React, { useState, useEffect } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar, Icon } from 'react-native-tab-view'; 

import Home from '../tabs/home';
import Profile from '../tabs/profile';
import Month from '../tabs/month';

const HomeTab = () => (
  <Home />
);

const ProfileTab = () => (
  <Profile />
);

const MonthTab = () => (
  <Month />
);

const getTabWidth = props => props.layout.width / props.navigationState.routes.length;

export default function Navigation() {
  const [ state, setState ] = useState({
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'profile', title: 'Profile' },
      { key: 'month', title: 'Month' },
    ],
  });
  return (
    <TabView
        navigationState={ state }
        renderScene={ SceneMap({
          home: HomeTab,
          profile: ProfileTab,
          month: MonthTab,
        })}
        onIndexChange={ index => setState( {...state, index } )}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar = { props => { 
              const inputRange = props.navigationState.routes.map(({}, i) => i);
              const tabWidth = getTabWidth(props);
              return (
                <View>
                  <Animated.View pointerEvents="none" style={[styles.indicatorContainer]}>
                    <Text>Hey</Text>
                  </Animated.View>
                </View>
              );
            }
        }
        style={ styles.container }
    />
  );
}
// {props.navigationState.routes.map((route, i) => {
//   const color = props.position.interpolate({
//     inputRange,
//     outputRange: inputRange.map(inputIndex =>
//       inputIndex === i ? "#D6356C" : "#222",
//     ),
//   });
//   return (
//     <TouchableOpacity
//       style={styles.tabItem}
//       onPress={() => this.setState({ index: i })}
//     >
//       <Animated.Text style={{ color }}>{route.title}</Animated.Text>
//     </TouchableOpacity>
//   );
// })}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight
  },
  scene: {
    flex: 1,
  },
    tabBar: {
      flexDirection: "row",
    },
    tabItem: {
      flex: 1,
      alignItems: "center",
      padding: 16,
    },
    indicatorContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    indicator: {
      backgroundColor: "#ffeb3b",
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      height: 2,
    }
  });

/*
<TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white', color: 'black' }}
            style={{ backgroundColor: 'white', color: 'black' }}
            />
            */
