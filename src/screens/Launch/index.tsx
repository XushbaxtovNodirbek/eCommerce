import {StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {reset} from 'navigators/NavigationService';
import color from 'assets/styles/color';
import globalStyles from 'assets/styles/globalStyles';
import {Avatar} from 'react-native-paper';
import useStore from 'store';
import {setToken} from 'api';
import logger from 'helpers/logger';
// @ts-ignore
import {get} from 'lodash';

const Launch = () => {
  const {userData} = useStore();

  useEffect(() => {
    logger(userData);

    setTimeout(() => {
      if (userData.auth_token) {
        setToken(userData.auth_token);
        if (get(userData, 'user_role') === 'seller') {
          reset('Tabs', 0);
        } else {
          reset('SellerTabs', 0);
        }
      } else {
        reset('Auth', 0);
      }
    }, 2000);
  }, []);
  return (
    <View
      style={[
        {flex: 1, backgroundColor: color.white, justifyContent: 'center'},
        globalStyles.center,
      ]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.white} />
      <Avatar.Text size={150} label="RN" />
    </View>
  );
};

export default Launch;
