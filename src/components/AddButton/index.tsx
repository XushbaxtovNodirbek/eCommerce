import color from 'assets/styles/color';
import AddBtnModal from 'components/Modals/AddButtonMoadal';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

const AddBtn = () => {
  const ref = React.useRef(null);

  return (
    <>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 20, right: 10}}
        onPress={() => {
          // @ts-ignore
          ref.current?.open();
        }}>
        <Avatar.Text
          style={{
            backgroundColor: color.brandColor,
          }}
          color={color.white}
          size={48}
          label="+"
        />
      </TouchableOpacity>
      <AddBtnModal getRef={r => (ref.current = r)} />
    </>
  );
};

export default AddBtn;
