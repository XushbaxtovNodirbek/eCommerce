import {api} from 'api';
import requests from 'api/requests';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import {TextInput} from 'components';
import {ModalProps} from 'components/Modals/ModalProps';
import logger from 'helpers/logger';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import useStore from 'store';

const AddProductToListModal = ({onRefresh, getRef}: ModalProps) => {
  const [visible, setVisible] = React.useState(false);

  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [product_list_id, setProductListId] = useState(0);

  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    let ref = {
      open: (product_list_id: number) => {
        setProductListId(product_list_id);
        setVisible(true);
      },
      close: () => setVisible(false),
    };
    getRef(ref);
  }, []);

  const products = useStore(state => state.products);

  const addProduct = useCallback(
    (data: {
      product_id: number;
      product_list_id: number;
      sale_price: number;
      price: number;
      amount: number;
      status: number;
      type: number;
    }) => {
      api
        .post('/product-histories', data)
        .then(res => {
          logger(res);
          onRefresh();
          setValue(0);
          setPrice('');
          setSalePrice('');
          setAmount('');
          setVisible(false);
          Toast.show({
            type: 'success',
            text1: 'Muvaffaqiyat',
            text2: 'Mahsulot qo`shildi',
          });
        })
        .catch(err => {
          logger(err);
          Toast.show({
            type: 'error',
            text1: 'Xatolik',
            text2: 'Mahsulot qo`shishda xatolik yuz berdi',
          });
        });
    },
    [],
  );

  return (
    <Modal
      backdropOpacity={0.7}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>Mahsulot qo'shish</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={products}
          search
          onChangeText={text => {
            setTimeout(() => {
              requests.fetchProducts(text);
            }, 1000);
          }}
          maxHeight={300}
          // @ts-ignore
          labelField="name"
          // @ts-ignore
          valueField="id"
          placeholder={!isFocus ? 'Sotuvchini tanlang' : '...'}
          searchPlaceholder="Qidirish..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            // @ts-ignore
            setValue(item?.id);
            setIsFocus(false);
          }}
        />
        <View style={styles.row}>
          <TextInput
            value={price}
            setValue={setPrice}
            placeholder="Kelish narxi"
            isNumber
            isRequired
            width={'49%'}
          />
          <TextInput
            value={salePrice}
            setValue={setSalePrice}
            placeholder="sotish narxi"
            isNumber
            isRequired
            width={'49%'}
          />
        </View>
        <TextInput
          value={amount}
          setValue={setAmount}
          placeholder="Miqdori"
          isNumber
          isRequired
          width={'100%'}
        />
        <Button
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => {
            if (!value || !price || !salePrice || !amount || !product_list_id) {
              setVisible(false);
              Toast.show({
                type: 'error',
                text1: 'Xatolik',
                text2: "Barcha maydonlarni to'ldiring",
              });
              return;
            }
            addProduct({
              product_id: value,
              product_list_id,
              sale_price: Number(salePrice),
              price: Number(price),
              amount: Number(amount),
              status: 2,
              type: 1,
            });
          }}>
          Qo'shish
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
    color: color.textColor,
    marginBottom: 10,
  },
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
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
  dropdown: {
    height: 50,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  selectedTextStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    color: color.textColor,
    height: 40,
    fontSize: 16,
  },
});

export default AddProductToListModal;
