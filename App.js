import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'mobx-react';

import RootStack from './scr/navigation';

import store from './scr/models';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
