import color from 'assets/styles/color';
import AddBtnModal from 'components/Modals/AddButtonMoadal';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

const AddBtn = ({getRef}: {getRef: (ref: any) => void}) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    let ref = {
      hide: () => {
        setVisible(false);
      },
      show: () => {
        setVisible(true);
      },
    };
    getRef(ref);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 10,
          zIndex: 9,
          display: !visible ? 'none' : 'flex',
        }}
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
