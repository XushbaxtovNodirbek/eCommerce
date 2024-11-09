import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabType} from 'types';
import {Text} from 'react-native';
import Main from 'screens/Tabs/Home';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import {
  BasketTab,
  CustomersTab,
  HomeTab,
  StatisticsTab,
  WerhouseTab,
} from 'assets/icons';
import Werhouse from './Wehouse';
import Customers from './Customers';
import Statistics from './Statistics';
import Basket from './Baked';

const Tab = createBottomTabNavigator<BottomTabType>();

const Tabs = () => {
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
        name="Home"
        component={Main}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <WerhouseTab
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
              Ombor
            </Text>
          ),
        }}
        name="Werhouse"
        component={Werhouse}
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
        name="Basket"
        component={Basket}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <StatisticsTab
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
              Xisobotlar
            </Text>
          ),
        }}
        name="Statistics"
        component={Statistics}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
