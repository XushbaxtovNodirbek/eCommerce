import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {ModalProps} from '../ModalProps';
import AddUserModal from '../AddUser';
import AddCategoryModal from '../AddCategory';
import {navigate} from 'navigators/NavigationService';

const AddBtnModal = ({getRef}: ModalProps) => {
  const [visible, setVisible] = useState(false);

  const userModalRef = React.useRef(null);
  const categoryModalRef = React.useRef(null);

  useEffect(() => {
    let ref = {
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  return (
    <Modal
      backdropOpacity={0}
      isVisible={visible}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            categoryModalRef.current?.open();
          }}
          style={styles.item}>
          <Text style={styles.text}>Kategoriya qo'shish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            userModalRef.current?.open();
          }}
          style={styles.item}>
          <Text style={styles.text}>Mijoz\Ishchi qo'shish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Qarz qo'shsih\ayirish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('AddProduct', {});
          }}
          style={styles.item}>
          <Text style={styles.text}>Mahsulot yaratish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Kirim-chiqim yaratish</Text>
        </TouchableOpacity>
      </View>
      <AddUserModal getRef={r => (userModalRef.current = r)} />
      <AddCategoryModal getRef={r => (categoryModalRef.current = r)} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  text: {
    fontSize: 13,
    fontFamily: fonts.ManropeMedium,
    color: color.white,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    bottom: 150,
  },
  item: {
    minWidth: 170,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 7,
    backgroundColor: color.brandColor,
  },
});

export default AddBtnModal;
