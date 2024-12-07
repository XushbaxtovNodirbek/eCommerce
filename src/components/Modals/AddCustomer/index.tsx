import {ModalProps} from 'components/Modals/ModalProps.ts';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import color from 'assets/styles/color.ts';
import TextInput from 'components/TextInput';
import {Button} from 'react-native-paper';
import fonts from 'assets/styles/fonts.ts';
import {api} from 'api';
import logger from 'helpers/logger';

type Props = ModalProps & {
  setCustomer: any;
};

const AddCustomer = ({getRef, setCustomer}: Props) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

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

  const createUser = useCallback(
    (user: {
      full_name: string;
      phone_number: string;
      address: string;
      status: number;
    }) => {
      api
        .post('/customers', user)
        .then(data => {
          setCustomer(data);
          setError('Muvaffaqiyatli qo`shildi');
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
          setTimeout(() => {
            setVisible(false);
            setError('');
            setFullName('');
            setPhone('');
            setAddress('');
          }, 1500);
        });
    },
    [],
  );

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      backdropColor={color.gray}
      onBackdropPress={() => {
        setVisible(false);
        setFullName('');
        setPhone('');
        setAddress('');
      }}
      backdropOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.text}>Mijoz Qo'shish</Text>
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
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {margin: 0, alignItems: 'center', justifyContent: 'center'},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '90%',
    backgroundColor: color.white,
  },
  form: {
    width: '90%',
  },
  text: {
    color: color.textColor,
    alignSelf: 'center',
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
  },
});
export default AddCustomer;
