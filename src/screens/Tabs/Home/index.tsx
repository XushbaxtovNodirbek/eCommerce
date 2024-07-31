import color from 'assets/styles/color';
import globalStyles from 'assets/styles/globalStyles';
import {AddBtn} from 'components';
import React, {useEffect} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import useStore from 'store';

const Main = () => {
  const {setUserData, userData} = useStore();
  useEffect(() => {
    // setUserData({auth_token: ''});
  }, []);

  return (
    <View style={globalStyles.center}>
      <StatusBar backgroundColor={color.white} barStyle="dark-content" />
      <AddBtn />
      <ScrollView></ScrollView>
    </View>
  );
};

export default Main;
