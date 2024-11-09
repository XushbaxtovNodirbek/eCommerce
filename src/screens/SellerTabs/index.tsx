import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SellerBottomTabType} from 'types';
import {Text} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import Home from './Home';
import {HomeTab} from 'icons';

const Tab = createBottomTabNavigator<SellerBottomTabType>();

const SellerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: '#9D9291',
        tabBarActiveTintColor: color.textColor,
        tabBarLabelStyle: {
          fontFamily: fonts.ManropeRegular,
        },
        tabBarItemStyle: {
          height: 65,
          paddingBottom: 7,
          paddingTop: 5,
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          elevation: 19,
          backgroundColor: color.white,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <HomeTab size={22} color={focused ? color.brandColor : '#9D9291'} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: fonts.ManropeMedium,
                fontSize: 11,
                color: focused ? color.brandColor : '#9D9291',
              }}>
              Asosiy
            </Text>
          ),
        }}
        name={'Home'}
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default SellerTabs;
