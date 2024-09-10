import color from 'assets/styles/color';
import globalStyles from 'assets/styles/globalStyles';
import {AddBtn, SettingsButton} from 'components';
import React, {useEffect} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import useStore from 'store';
import {useCameraPermission} from 'react-native-vision-camera';
import requests from 'api/requests';

const Main = () => {
  const {setUserData, userData} = useStore();
  const {hasPermission, requestPermission} = useCameraPermission();
  const addBtnRef = React.useRef(null);

  useEffect(() => {
    requests.fetchCustomers();
    requests.fetchCategories();
    requests.fetchProducts();
    // setUserData({auth_token: ''});
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  return (
    <View style={globalStyles.center}>
      <StatusBar backgroundColor={color.white} barStyle="dark-content" />
      <AddBtn getRef={r => (addBtnRef.current = r)} />
      <SettingsButton />
      <ScrollView></ScrollView>
    </View>
  );
};

export default Main;
