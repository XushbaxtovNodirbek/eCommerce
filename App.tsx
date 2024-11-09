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
import Toast from 'react-native-toast-message';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App() {
  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={_navigator}>
          <Navigator />
        </NavigationContainer>
        <Toast onPress={() => Toast.hide()} />
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
}

export default App;
