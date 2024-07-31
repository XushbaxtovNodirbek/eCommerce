import {useEffect, useState} from 'react';
import {ModalProps} from '../ModalProps';
import Modal from 'react-native-modal';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fonts from 'assets/styles/fonts';
import color from 'assets/styles/color';
import TextInput from 'components/TextInput';
import {Button} from 'react-native-paper';

const AddUserModal = ({getRef}: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // form datas
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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
  }, [getRef]);

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
        <View style={styles.switch}>
          <TouchableOpacity
            onPress={() => setActiveTab(0)}
            style={[
              styles.switchBtn,
              activeTab === 1 && {backgroundColor: color.white},
            ]}>
            <Text
              style={[
                styles.text,
                activeTab === 1 && {color: color.textColor},
              ]}>
              Ishchi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab(1)}
            style={[
              styles.switchBtn,
              activeTab === 0 && {backgroundColor: color.white},
            ]}>
            <Text
              style={[
                styles.text,
                activeTab === 0 && {color: color.textColor},
              ]}>
              Mijoz
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 0 && (
          <View style={styles.form}>
            <TextInput value={name} setValue={setName} placeholder="Ism" />
            <TextInput
              value={surname}
              setValue={setSurname}
              placeholder="Familiya"
            />
            <TextInput
              value={phone}
              setValue={setPhone}
              placeholder="Telefon raqam"
              isPhone={true}
            />
            <TextInput
              value={address}
              setValue={setAddress}
              placeholder="Manzil"
            />
            <Button
              mode="contained"
              textColor="white"
              style={{
                marginTop: 10,
                backgroundColor: color.brandColor,
                borderRadius: 10,
              }}>
              Saqlash
            </Button>
          </View>
        )}
        {activeTab === 1 && (
          <View style={styles.form}>
            <TextInput value={name} setValue={setName} placeholder="Ism" />
            <TextInput
              value={surname}
              setValue={setSurname}
              placeholder="Familiya"
            />
            <TextInput
              value={phone}
              setValue={setPhone}
              placeholder="Telefon raqam"
              isPhone={true}
            />
            <TextInput
              value={address}
              setValue={setAddress}
              placeholder="Manzil"
            />
            <Button
              mode="contained"
              textColor="white"
              style={{
                marginTop: 10,
                backgroundColor: color.brandColor,
                borderRadius: 10,
              }}>
              Saqlash
            </Button>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddUserModal;
const styles = StyleSheet.create({
  modal: {margin: 0, alignItems: 'center', justifyContent: 'center'},
  text: {
    fontSize: 13,
    fontFamily: fonts.ManropeMedium,
    color: color.white,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    backgroundColor: color.white,
  },
  item: {
    minWidth: 170,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 7,
    backgroundColor: color.brandColor,
  },
  switch: {
    flexDirection: 'row',
    gap: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: color.descColor,
    borderRadius: 100,
  },
  switchBtn: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: color.brandColor,
  },
  form: {
    marginTop: 10,
  },
});
