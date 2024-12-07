import React, {useCallback, useEffect} from 'react';
import {ModalProps} from '../ModalProps';
import Modal from 'react-native-modal';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import TextInput from 'components/TextInput';
import {Button} from 'react-native-paper';
import {api} from 'api';
import logger from 'helpers/logger';
import Toast from 'react-native-toast-message';

const AddAmount = ({getRef, onRefresh}: ModalProps) => {
  const [visible, setVisible] = React.useState(false);
  const [product, setProduct] = React.useState<any>();
  const [error, setError] = React.useState('');
  // false 1
  // true 2
  const [price, setPrice] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [sale_price, setSalePrice] = React.useState('');
  const [sale_price_min, setSalePriceMin] = React.useState('');

  useEffect(() => {
    setError('');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 2000);
  }, [error]);

  useEffect(() => {
    let ref = {
      open: (prod: any) => {
        setVisible(true);
        setProduct(prod);
      },
      close: () => {
        setVisible(false);
      },
    };

    getRef(ref);
  }, [getRef]);

  const handleSave = useCallback(() => {
    if (!amount || !price || !sale_price) {
      setError("Majburiy maydonlarni to'ldiring");
      return;
    }
    api
      .post('/products/add-amount/' + product.id, {
        price: Number(price),
        amount: Number(amount),
        sale_price: Number(sale_price),
        sale_price_min: Number(sale_price_min) || Number(sale_price),
      })
      .then(res => {
        setError('Muvaffaqiyatli saqlandi');
        setAmount('');
        setPrice('');
        setSalePrice('');
        setSalePriceMin('');
        logger(res);
        setVisible(false);
        Toast.show({
          type: 'success',
          text1: 'Muvaffaqiyatli',
          text2: 'Muvaffaqiyatli saqlandi',
        });
      })
      .catch(err => {
        setError('Xatolik yuz berdi');
        logger(err);
      })
      .finally(() => {
        if (onRefresh) {
          onRefresh();
        }
      });
  }, [price, amount, sale_price, sale_price_min]);

  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={visible}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {product ? product?.name : 'Birlik yaratish'}
        </Text>
        <Text
          style={{
            color: error.startsWith('Muvaffaqiyatli')
              ? color.green
              : color.alizarin,
            marginBottom: 4,
          }}>
          {error}
        </Text>
        <TextInput
          isNumber
          isRequired
          value={price}
          setValue={setPrice}
          placeholder="Kelish narxi kiriting"
          rightIcon={<Text style={styles.text2}>so'm</Text>}
        />
        <TextInput
          isNumber
          isRequired
          value={sale_price}
          setValue={setSalePrice}
          placeholder="Sotish narxi kiriting"
          rightIcon={<Text style={styles.text2}>so'm</Text>}
        />
        <TextInput
          isNumber
          value={sale_price_min}
          setValue={setSalePriceMin}
          placeholder="Sotish narxi(min) kiriting"
          rightIcon={<Text style={styles.text2}>so'm</Text>}
        />
        <TextInput
          isNumber
          isRequired
          value={amount}
          setValue={setAmount}
          placeholder="Sonni kiriting"
        />

        <Button
          style={{backgroundColor: color.brandColor}}
          mode="contained"
          onPress={() => {
            handleSave();
          }}
          textColor={color.white}>
          Saqlash
        </Button>
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
  title: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
    color: color.textColor,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  text2: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: fonts.ManropeMedium,
  },
});

export default AddAmount;
