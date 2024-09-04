import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import TextInput from 'components/TextInput';
import {Dropdown} from 'react-native-element-dropdown';
import {api} from 'api';
import {ScanIcon} from 'assets/icons';
import {Button} from 'react-native-paper';
import ScannerModal from './../../components/Modals/ScannerModal';
import Toast from 'react-native-toast-message';

const AddProduct = () => {
  const scannerRef = React.useRef(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('');
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState<{
    name: string;
    price: string;
    sale_price: string;
    sale_price_min: string;
    min_amount: string;
    barcode: string;
    category_id: number | null;
    status: number;
  }>({
    name: '',
    category_id: null,
    price: '',
    sale_price: '',
    sale_price_min: '',
    min_amount: '',
    barcode: '',
    status: 1,
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setError('');
  }, [product]);

  const getCategories = useCallback(() => {
    api
      .get('/categories?include=unit')
      .then(res => {
        let data = res.data;
        setCategories(data);
      })
      .catch(err => {
        console.log('getCategories', err);
      });
  }, []);

  const addProduct = useCallback(
    (product: {
      name: string;
      price: number;
      sale_price: number;
      sale_price_min: number;
      min_amount: number;
      barcode: string;
      category_id: number;
      status: number;
    }) => {
      console.log('product', product);

      api
        .post('/products', product)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Muvaffaqiyatli',
            text2: 'Mahsulot qo`shildi',
          });
          setProduct({
            name: '',
            category_id: null,
            price: '',
            sale_price: '',
            sale_price_min: '',
            min_amount: '',
            barcode: '',
            status: 1,
          });
          setSelected('');
          console.log('addProduct', res.data);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Xatolik',
            text2: 'Xatolik yuz berdi',
          });
          console.log('addProduct', err);
        });
    },
    [],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        default: 'height',
      })}
      style={{flex: 1, paddingHorizontal: 20}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 100,
        }}>
        <Text style={styles.title}>Mahsulot Qo'shish</Text>
        <Text
          numberOfLines={2}
          style={{
            color: color.alizarin,
            marginBottom: 5,
          }}>
          {error}
        </Text>
        <TextInput
          placeholder="Mahsulot nomi..."
          value={product.name}
          setValue={txt => setProduct({...product, name: txt})}
          width={'100%'}
          isRequired={true}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.text}
          iconStyle={styles.iconStyle}
          data={categories}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Kategoriya tanlang..."
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            // @ts-ignore
            setSelected(item.id);
          }}
        />
        <View style={styles.row}>
          <TextInput
            value={product.price}
            placeholder="Kelish narxi"
            setValue={t => setProduct({...product, price: t})}
            isNumber={true}
            width={'49%'}
            isRequired={true}
          />
          <TextInput
            value={product.sale_price}
            placeholder="Sotish narxi"
            setValue={t => setProduct({...product, sale_price: t})}
            isNumber={true}
            width={'49%'}
            isRequired={true}
          />
        </View>

        <TextInput
          value={product.sale_price_min}
          placeholder="Minimal sotish narxi"
          setValue={t => setProduct({...product, sale_price_min: t})}
          isNumber={true}
          width={'100%'}
        />
        <TextInput
          width={'100%'}
          value={product.min_amount}
          placeholder="Minimal miqdor"
          setValue={t => setProduct({...product, min_amount: t})}
          isNumber={true}
        />
        <TextInput
          width={'100%'}
          value={product.barcode}
          setValue={t => setProduct({...product, barcode: t})}
          placeholder="Barkod"
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                scannerRef.current.open();
              }}>
              <ScanIcon size={20} />
            </TouchableOpacity>
          }
        />
        <Button
          onPress={() => {
            if (!product.name) {
              Toast.show({
                type: 'error',
                text1: 'Xatolik',
                text2: 'Mahsulot nomini kiriting',
              });
              return;
            }
            if (!selected) {
              Toast.show({
                type: 'error',
                text1: 'Xatolik',
                text2: 'Kategoriyani tanlang',
              });
              return;
            }
            if (!product.price) {
              Toast.show({
                type: 'error',
                text1: 'Xatolik',
                text2: 'Kelish narxini kiriting',
              });
              return;
            }
            if (!product.sale_price) {
              Toast.show({
                type: 'error',
                text1: 'Xatolik',
                text2: 'Sotish narxini kiriting',
              });
              return;
            }
            addProduct({
              name: product.name,
              price: +product.price,
              sale_price: +product.sale_price,
              sale_price_min: +product.sale_price_min,
              min_amount: +product.min_amount,
              barcode: product.barcode,
              category_id: +selected,
              status: product.status,
            });
          }}
          mode="contained"
          textColor="white"
          style={{
            width: '100%',
            marginTop: 10,
            backgroundColor: color.brandColor,
            borderRadius: 10,
            bottom: 10,
          }}>
          Saqlash
        </Button>
      </ScrollView>

      <ScannerModal
        getCode={code => setProduct({...product, barcode: code})}
        getRef={r => (scannerRef.current = r)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1.2,
    borderColor: color.gray,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 8,
    height: 45,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: color.textColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: color.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: color.textColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: color.textColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.ManropeMedium,
    color: 'rgba(0,0,0,0.7)',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: fonts.ManropeBold,
    color: 'rgba(0,0,0,0.6)',
  },
});

export default AddProduct;
