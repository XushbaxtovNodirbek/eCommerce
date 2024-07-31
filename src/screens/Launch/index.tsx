import {StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {reset} from 'navigators/NavigationService';
import color from 'assets/styles/color';
import globalStyles from 'assets/styles/globalStyles';
import {Avatar} from 'react-native-paper';
import useStore from 'store';
import {setToken} from 'api';

const Launch = () => {
  const {userData} = useStore();

  useEffect(() => {
    console.log(userData);

    setTimeout(() => {
      if (userData.auth_token) {
        setToken(userData.auth_token);
        reset('Tabs', 0);
      } else {
        reset('Auth', 0);
      }
    }, 2000);
  }, []);
  return (
    <View
      style={[{flex: 1, backgroundColor: color.white}, globalStyles.center]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.white} />
      <Avatar.Text size={150} label="RN" />
    </View>
  );
};

export default Launch;
