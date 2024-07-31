import color from 'assets/styles/color';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

type AddBtnProps = {
  onPress?: () => void; // Function to be called when the button is pressed
};

const AddBtn = ({onPress}: AddBtnProps) => {
  return (
    <TouchableOpacity
      style={{position: 'absolute', bottom: 20, right: 10}}
      onPress={onPress}>
      <Avatar.Text
        style={{
          backgroundColor: color.brandColor,
        }}
        color={color.white}
        size={48}
        label="+"
      />
    </TouchableOpacity>
  );
};

export default AddBtn;
