/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './src/i18n';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigators';
import {_navigator} from './src/navigators/NavigationService';
import {PaperProvider} from 'react-native-paper';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={_navigator}>
        <Navigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
