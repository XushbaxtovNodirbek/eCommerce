import globalStyles from 'assets/styles/globalStyles';
import {AddBtn} from 'components';
import React from 'react';
import {Text, View} from 'react-native';

const Sellers = () => {
  const addBtnRef = React.useRef(null);
  return (
    <View style={globalStyles.center}>
      <AddBtn getRef={r => (addBtnRef.current = r)} />
    </View>
  );
};

export default Sellers;
