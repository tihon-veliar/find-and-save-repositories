import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import RepositoryScreen from '../screens/RepositoryScreen';
import FavoritesList from '../screens/FavoritesList';
import screens from './screens';

const Tab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'green',
          tabStyle: { backgroundColor: 'blue' },
          style: {
            backgroundColor: 'pink',
          },
          // labelStyle: {
          //   fontFamily: fonts.dosis.regular,
          //   fontSize: fontScaleNormalize(12),
          // },
        }}>
        <Tab.Screen
          name={screens.list}
          component={RepositoryScreen}
          options={{
            tabBarLabel: 'list',
          }}
        />

        <Tab.Screen
          name={screens.favorites}
          component={FavoritesList}
          options={{
            tabBarLabel: 'favorites',
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
