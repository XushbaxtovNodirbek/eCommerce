import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabType} from 'types';
import {Platform, Text, View} from 'react-native';
import Main from 'screens/Tabs/Home';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import {
  CustomersTab,
  HomeTab,
  SellersTab,
  StatisticsTab,
  WerhouseTab,
} from 'assets/icons';
import Werhouse from './Wehouse';
import Customers from './Customers';
import Statistics from './Statistics';
import {Button} from 'react-native-paper';
import Sellers from './Sellers';

const Tab = createBottomTabNavigator<BottomTabType>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 70,
          borderTopWidth: 0,
          shadowColor: Platform.OS === 'ios' ? '#EBE9E9' : '#000',
          shadowOffset: {
            height: -4,
            width: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: 20,
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
            <SellersTab
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
              Ishchilar
            </Text>
          ),
        }}
        name="Sellers"
        component={Sellers}
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
