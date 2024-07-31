import * as React from 'react';
import {NavigatorType, screens} from '../types';
import type {NavigationContainerRef} from '@react-navigation/native';

const _navigator = React.createRef<NavigationContainerRef<NavigatorType>>();

function navigate(routeName: screens, params: any) {
  if (!!_navigator.current) _navigator.current.navigate(routeName, params);
  else {
    console.warn('_navigator not found in NavigationService');
  }
}

function reset(routeName: screens, index: number, params?: any) {
  if (!!_navigator.current)
    _navigator.current.reset({
      index,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    });
  else {
    console.warn('_navigator not found in NavigationService');
  }
}

function goBack() {
  if (!!_navigator.current) _navigator.current.goBack();
  else {
    console.warn('_navigator not found in NavigationService');
  }
}

export {navigate, goBack, _navigator, reset};
