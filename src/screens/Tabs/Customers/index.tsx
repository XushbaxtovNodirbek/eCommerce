import globalStyles from 'assets/styles/globalStyles';
import {AddBtn} from 'components';
import React from 'react';
import {Text, View} from 'react-native';

const Customers = () => {
  return (
    <View style={globalStyles.center}>
      <AddBtn />
    </View>
  );
};

export default Customers;
