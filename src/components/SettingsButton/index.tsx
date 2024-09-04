import {Settings} from 'assets/icons';
import color from 'assets/styles/color';
import AddBtnModal from 'components/Modals/AddButtonMoadal';
import {navigate} from 'navigators/NavigationService';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';

const SettingsButton = () => {
  return (
    <>
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 10}}
        onPress={() => navigate('Setting', {})}>
        <View
          style={{
            backgroundColor: color.brandColor,
            borderRadius: 24,
            width: 48,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Settings />
        </View>

        {/* <Avatar.Icon
          style={{
            backgroundColor: color.brandColor,
          }}
          size={48}
          icon={<Settings />}
        /> */}
      </TouchableOpacity>
    </>
  );
};

export default SettingsButton;
