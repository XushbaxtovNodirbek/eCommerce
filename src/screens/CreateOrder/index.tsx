import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'componets';
import {EditIcon, ScanIcon} from 'icons';
import ScannerModal from 'components/Modals/ScannerModal';
import logger from 'helpers/logger';
import {api} from 'api';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import color from 'assets/styles/color.ts';
import Switch from 'components/Switch';
import numberWithSpaces from 'helpers/numberWithSpaces';
import {Button} from 'react-native-paper';
import {get, isEmpty} from 'lodash';
import fonts from 'assets/styles/fonts.ts';
import useController from './useController';
import CloseOrder from 'assets/icons/CloseOrder.tsx';
import Accept from 'assets/icons/Accept.tsx';
import CompleateOrder from 'components/Modals/CompleateOrder';

export default (props: any) => {
  const [search, setSearch] = useState('');
  const [close, setClose] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const scannerRef = React.useRef(null);
  const [peerSoum, setPeerSoum] = useState(false);
  const [value, setValue] = useState('0');
  const [product, setProduct] = useState({});
  const modalRef = useRef(null);
  const {getAllProducts, addProduct, products} = useController();

  logger(props);

  useEffect(() => {
    getAllProducts(get(props, 'route.params.id', 1));
  }, []);

  useEffect(() => {
    if (search.length >= 1) searchProducts(search);
  }, [search]);

  const deleteProduct = useCallback((id: number) => {
    api.delete(`/order-goods/${id}`).then(() => {
      getAllProducts(11);
    });
  }, []);

  const searchProducts = useCallback((text: string) => {
    console.log('searching', text);

    api
      .get(`/products?include=category.unit&sort=id&search=${text}`)
      .then(({data}) => {
        // @ts-ignore
        setSearchData(data);
        // if (data.length === 1) {
        //   console.log('searching', data);
        //   let item = data[0];
        //   // @ts-ignore
        //   setValue(item.id);
        //   // @ts-ignore
        //   setPrice(item.price.toString());
        //   // @ts-ignore
        //   setSalePrice(item.sale_price.toString());
        //   // @ts-ignore
        //   setSearch(item.name);
        //   setClose(true);
        // }
        logger(data);
      })
      .catch(logger);
  }, []);

  // @ts-ignore
  return (
    <BottomSheetModalProvider>
      <StatusBar backgroundColor={color.lgray} barStyle={'dark-content'} />
      <View style={styles.header}>
        <View />
        <Text style={styles.title}>
          Order No {get(props, 'route.params.id')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            // modalRef.current.open(get(, 'id', 0), get(item, 'orderSum', 0));
          }}>
          <Accept />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: color.lgray,
            borderRadius: 10,
            padding: 10,
          }}>
          {products.map((item, index) => (
            <View key={index}>
              <View style={styles.itemCon}>
                <View>
                  <Text
                    style={styles.productName}
                    numberOfLines={1}
                    key={index}>
                    •{get(item, 'product.name', '-----')}
                  </Text>
                  <Text style={styles.desc}>
                    {`${numberWithSpaces(
                      get(item, 'product.sale_price', 0),
                    )} so'm x ${get(item, 'amount', 1)} = ${numberWithSpaces(
                      get(item, 'product.sale_price', 0) *
                        get(item, 'amount', 1),
                    )} so'm`}
                  </Text>
                </View>
                <Text style={styles.price}>
                  {numberWithSpaces(
                    get(item, 'product.sale_price', 0) * get(item, 'amount', 1),
                  )}{' '}
                  {"so'm"}
                </Text>
              </View>
              <View style={{flexDirection: 'row-reverse', gap: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'O`chirish',
                      'Mahsulotni o`chirishni tasdiqlaysizmi?',
                      [
                        {
                          text: 'Yo`q',
                          style: 'cancel',
                        },
                        {
                          text: 'Ha',
                          onPress: () => {
                            deleteProduct(get(item, 'id', -1));
                          },
                        },
                      ],
                    );
                  }}
                  style={styles.btn}>
                  <CloseOrder />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <EditIcon size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.div} />
            </View>
          ))}
        </ScrollView>
        <ScannerModal
          getRef={ref => (scannerRef.current = ref)}
          getCode={code => {
            setSearch(code);
          }}
        />
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
        <View style={{marginTop: 3}}>
          {!isEmpty(product) && (
            <Text style={styles.desc}>
              Narx:{get(product, 'sale_price')} so'm | Min:{' '}
              {get(product, 'sale_price_min')} so'm
            </Text>
          )}
          {search && !close && searchData.length > 0 && (
            <View style={styles.dropdown}>
              {searchData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // // @ts-ignore
                    // setValue(item.id);
                    // // @ts-ignore
                    // setPrice(item.price.toString());
                    // // @ts-ignore
                    // setSalePrice(item.sale_price.toString());
                    // @ts-ignore
                    setSearch(item.name);
                    setProduct(item);
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
              ))}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            value={value}
            setValue={setValue}
            isNumber
            placeholder="Miqdorni kiriting"
            width={'45%'}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 10,
              gap: 5,
              width: '45%',
            }}>
            <Text style={{color: color.textColor, fontSize: 14}}>
              {/*{product?.category?.unit?.name?.toUpperCase() || 'KG'}*/}
              {get(product, 'category.unit.name', 'KG').toUpperCase()}
            </Text>
            <Switch value={peerSoum} onValueChange={setPeerSoum} />
            <Text style={{color: color.textColor, fontSize: 14}}>SOM</Text>
          </View>
        </View>
        <Text
          style={{
            color: color.textColor,
            fontSize: 12,
            fontWeight: '600',
          }}>{`Jami narxi ${numberWithSpaces(
          peerSoum
            ? Number(value.replaceAll(' ', ''))
            : Number(value.replaceAll(' ', '')) * get(product, 'sale_price', 0),
        )} som`}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button
            onPress={() => {
              Alert.alert(
                "O'chirish",
                "Mahsulotlarni o'chirishni tasdiqlaysizmi?",
                [
                  {
                    text: "Yo'q",
                    style: 'cancel',
                  },
                  {
                    text: 'Ha',
                    onPress: () => {
                      setProduct({});
                      setSearch('');
                      setValue('0');
                    },
                  },
                ],
              );
            }}
            style={{width: '48%'}}
            textColor={color.textColor}
            mode="outlined">
            Tozalash
          </Button>
          <Button
            disabled={get(product, 'id', 0) === 0}
            onPress={() => {
              addProduct(
                get(product, 'id', 0),
                get(props, 'route.params.id', 1),
                peerSoum
                  ? +(
                      Number(value.replaceAll(' ', '')) /
                      get(product, 'sale_price', 0)
                    ).toFixed(2)
                  : Number(value.replaceAll(' ', '')),
                get(product, 'sale_price', 0),
              );
              setProduct({});
              setSearch('');
              setValue('0');
            }}
            style={{width: '48%'}}
            textColor={color.textColor}
            mode="contained">
            Qo'shish
          </Button>
        </View>
        <CompleateOrder
          getRef={ref => {
            return (modalRef.current = ref);
          }}
        />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 10,
  },
  header: {
    height: 40,
    backgroundColor: color.lgray,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  btn: {
    height: 30,
    width: 30,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: color.gray,
    borderWidth: 1,
  },
  price: {
    color: color.textColor,
    fontSize: 15,
    fontFamily: fonts.ManropeSemiBold,
    letterSpacing: -1,
  },
  div: {
    width: '100%',
    height: 1,
    backgroundColor: color.gray,
    marginVertical: 5,
  },
  itemCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desc: {
    color: color.textColor,
    fontSize: 12,
    fontFamily: fonts.ManropeMedium,
    letterSpacing: -0.5,
  },
  selectedTextStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  item: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: color.gray,
  },
  dropdown: {
    maxHeight: 150,
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
  title: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
    color: color.textColor,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  listCon: {
    flex: 3,
    width: '100%',
    backgroundColor: color.lgray,
  },
  controls: {
    flex: 2,
    width: '100%',
    backgroundColor: color.white,
  },
  clear: {
    color: 'red',
    fontSize: 16,
    fontFamily: fonts.ManropeSemiBold,
  },
  text: {
    fontSize: 30,
    fontFamily: fonts.ManropeBold,
  },
  productName: {
    fontSize: 18,
    color: color.textColor,
    fontFamily: fonts.ManropeSemiBold,
    maxWidth: 200,
  },
});
