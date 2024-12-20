import {useCallback, useEffect, useState} from 'react';
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
import {api} from 'api';
import logger from 'helpers/logger';

const AddUserModal = ({getRef}: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // form datas
  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

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

  useEffect(() => {
    setError('');
  }, [username, fullName, phone, address]);
  const createUser = useCallback(
    (user: {
      username?: string;
      full_name: string;
      phone_number: string;
      password?: string;
      address: string;
      status?: number;
    }) => {
      if (user.full_name === '') {
        setError('Ism Familiya bo`sh bo`lishi mumkin emas');
        return;
      }
      if (user.phone_number === '') {
        setError('Telefon raqam bo`sh bo`lishi mumkin emas');
        return;
      }

      if (user.phone_number.length !== 9) {
        setError('Telefon raqamni to`liq kiriting');
        return;
      }
      if (user.address === '') {
        setError('Manzil bo`sh bo`lishi mumkin emas');
        return;
      }
      if (user.username === '') {
        api
          .post('/customers', user)
          .then(data => {
            logger(data);
            setTimeout(() => {
              setError('Muvaffaqiyatli qo`shildi');
            }, 1000);
            setFullName('');
            setPhone('');
            setAddress('');
          })
          .catch(error => {
            if (error.errors) {
              if (error.errors.username) {
                setError(error.errors.username.join(' '));
              } else if (error.errors.phone_number) {
                setError(error.errors.phone_number.join(' '));
              } else if (error.errors.full_name) {
                setError(error.errors.full_name.join(' '));
              } else if (error.errors.password) {
                setError(error.errors.password.join(' '));
              } else if (error.errors.address) {
                setError(error.errors.address.join(' '));
              }
            }
          })
          .finally(() => {
            setVisible(false);
          });
      } else {
        api
          .post('/users', user)
          .then(data => {
            logger(data);
            setTimeout(() => {
              setError('Muvaffaqiyatli qo`shildi');
            }, 1000);
            setFullName('');
            setPhone('');
            setAddress('');
          })
          .catch(error => {
            if (error.errors) {
              if (error.errors.phone_number) {
                setError(error.errors.phone_number.join(' '));
              } else if (error.errors.full_name) {
                setError(error.errors.full_name.join(' '));
              } else if (error.errors.address) {
                setError(error.errors.address.join(' '));
              }
            }
          })
          .finally(() => {
            setVisible(false);
          });
      }
    },
    [activeTab],
  );

  return (
    <Modal
      backdropColor={color.lgray}
      backdropOpacity={0.7}
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
            <Text
              numberOfLines={2}
              style={{
                color: error.startsWith('Muvaffaqiyatli')
                  ? color.green
                  : color.alizarin,
                marginBottom: 5,
              }}>
              {error}
            </Text>
            <TextInput
              value={fullName}
              setValue={text => {
                setFullName(text);
                setUsername(text.split(' ').join('_').toLowerCase());
              }}
              placeholder="Ism Familiya"
              width={'100%'}
            />
            <TextInput
              readonly={true}
              value={username}
              setValue={setUsername}
              placeholder="Username"
              width={'100%'}
            />
            <TextInput
              readonly={true}
              value={username}
              setValue={setUsername}
              placeholder="Parol"
              width={'100%'}
            />
            <TextInput
              value={phone}
              setValue={setPhone}
              placeholder="Telefon raqam"
              isPhone={true}
              width={'100%'}
            />
            <TextInput
              value={address}
              setValue={setAddress}
              placeholder="Manzil"
              width={'100%'}
            />
            <Button
              mode="contained"
              textColor="white"
              onPress={() => {
                createUser({
                  username,
                  password: username,
                  full_name: fullName,
                  phone_number: phone,
                  address,
                });
              }}
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
            <Text
              numberOfLines={2}
              style={{
                color: error.startsWith('Muvaffaqiyatli')
                  ? color.green
                  : color.alizarin,
                marginBottom: 5,
              }}>
              {error}
            </Text>
            <TextInput
              value={fullName}
              setValue={setFullName}
              placeholder="Familiya"
              width={'100%'}
            />
            <TextInput
              value={phone}
              setValue={setPhone}
              placeholder="Telefon raqam"
              isPhone={true}
              width={'100%'}
            />
            <TextInput
              value={address}
              setValue={setAddress}
              placeholder="Manzil"
              width={'100%'}
            />
            <Button
              onPress={() => {
                console.log('create user');

                createUser({
                  full_name: fullName,
                  phone_number: phone,
                  address,
                  status: 1,
                });
              }}
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
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 10,
  },
  switchBtn: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: color.brandColor,
  },
  form: {
    width: '90%',
    marginTop: 10,
  },
});
