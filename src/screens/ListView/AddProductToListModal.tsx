import {api} from 'api';
import {ScanIcon, SearchIcon} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import {TextInput} from 'components';
import {ModalProps} from 'components/Modals/ModalProps';
import ScannerModal from 'components/Modals/ScannerModal';
import logger from 'helpers/logger';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const AddProductToListModal = ({onRefresh, getRef}: ModalProps) => {
  const [visible, setVisible] = React.useState(false);

  const [value, setValue] = useState(0);
  const [close, setClose] = useState(false);
  const [product_list_id, setProductListId] = useState(0);

  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [amount, setAmount] = useState('');

  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);

  const scannerRef = React.useRef(null);

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

  useEffect(() => {
    searchProducts(search);
  }, [search]);

  const searchProducts = useCallback((text: string) => {
    console.log('searching', text);

    api
      .get(`/products?include=category.unit&sort=id&search=${text}`)
      .then(({data}) => {
        // @ts-ignore
        setSearchData(data);
      })
      .catch(logger);
  }, []);

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
      onModalHide={() => {
        setSearch('');
        setPrice('');
        setSalePrice('');
        setAmount('');
        setClose(false);
      }}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.title}>Mahsulot qo'shish</Text>
        <TextInput
          value={search}
          setValue={str => {
            setSearch(str);
            setClose(false);
          }}
          placeholder="Mahsulotni qidirish..."
          width={'100%'}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                scannerRef.current.open();
              }}>
              <ScanIcon size={24} />
            </TouchableOpacity>
          }
        />

        <View style={styles.row}>
          {search && !close && searchData.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={searchData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      // @ts-ignore
                      setValue(item.id);
                      // @ts-ignore
                      setPrice(item.price.toString());
                      // @ts-ignore
                      setSalePrice(item.sale_price.toString());
                      // @ts-ignore
                      setSearch(item.name);
                      setClose(true);
                    }}
                    style={styles.item}>
                    <Text style={styles.selectedTextStyle}>
                      {
                        // @ts-ignore
                        item.name
                      }
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
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
      </KeyboardAvoidingView>
      <ScannerModal
        getRef={ref => {
          scannerRef.current = ref;
        }}
        getCode={code => {
          setSearch(code);
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: color.gray,
  },
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
    maxHeight: 200,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'white',
    top: 0,
  },
  selectedTextStyle: {
    color: color.textColor,
    fontSize: 16,
  },
});

export default AddProductToListModal;
