import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import AllSongsScreen from '../screens/AllSongsScreen'
import FavouritesScreen from '../screens/FavouritesScreen';

export default TabNavigator(
  {
    Songs: {
      screen: AllSongsScreen,
    },
    Favourites: {
      screen: FavouritesScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Songs':
            iconName = Platform.OS === 'ios'
              ? `ios-book${focused ? '' : '-outline'}`
              : `md-book`;
            break;
          case 'Favourites':
            iconName = Platform.OS === 'ios'
              ? `ios-heart${focused ? '' : '-outline'}`
              : `md-heart${focused ? '' : '-outline'}`;
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected
    },
    swipeEnabled: false,
  }
);
