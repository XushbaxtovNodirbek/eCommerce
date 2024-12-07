import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SellerBottomTabType} from 'types';
import {StatusBar, Text} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import Savat from './Savat';
import {CustomersTab, HomeTab} from 'icons';
import Customers from './Customers';
import BasketTab from 'assets/icons/BasketTab.tsx';

const Tab = createBottomTabNavigator<SellerBottomTabType>();

const SellerTabs = () => {
  return (
    <>
      <StatusBar backgroundColor={color.lgray} barStyle="dark-content" />
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
            shadowColor: color.black,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <BasketTab
                size={22}
                color={focused ? color.brandColor : '#9D9291'}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: fonts.ManropeMedium,
                  fontSize: 11,
                  color: focused ? color.brandColor : '#9D9291',
                }}>
                Savat
              </Text>
            ),
          }}
          name={'Home'}
          component={Savat}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <CustomersTab
                size={22}
                color={focused ? color.brandColor : '#9D9291'}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: fonts.ManropeMedium,
                  fontSize: 11,
                  color: focused ? color.brandColor : '#9D9291',
                }}>
                Mijozlar
              </Text>
            ),
          }}
          name="Customers"
          component={Customers}
        />
      </Tab.Navigator>
    </>
  );
};

export default SellerTabs;
