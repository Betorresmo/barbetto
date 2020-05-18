import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Providers from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <Providers>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#202020" />
      </View>
      <Routes />
    </Providers>
  </NavigationContainer>
);

export default App;
