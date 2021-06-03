import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import styled from 'styled-components';

import RepositoryScreen from '../screens/RepositoryScreen';
import FavoritesList from '../screens/FavoritesList';
import screens from './screens';

import ToggleFavorites from '../components/ToggleFavorites';
import { palette } from '../core/styleGuide';
import List from '../components/icons/List';

const Tab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: palette.imperialRed,
          inactiveTintColor: palette.aliceBlue,
          tabStyle: { backgroundColor: palette.prussianBlue },
          showLabel: false,
        }}>
        <Tab.Screen
          name={screens.list}
          component={RepositoryScreen}
          options={{
            tabBarLabel: 'List',
            tabBarIcon: props => <List color={props.color} />,
          }}
        />

        <Tab.Screen
          name={screens.favorites}
          component={FavoritesList}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: props => (
              <ToggleFavorites
                color={props.color}
                isFavorites={props.focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const View = styled.View`
  height: 100%;
`;
export default RootStack;
