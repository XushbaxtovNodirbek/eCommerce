import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {TextInput} from 'components';
import {ScanIcon} from 'assets/icons';
import ScannerModal from 'components/Modals/ScannerModal';
import logger from 'helpers/logger';
import {api} from 'api';

export default () => {
  const [search, setSearch] = useState('');
  const [close, setClose] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const scannerRef = React.useRef(null);

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
      })
      .catch(logger);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.body}>
        <View style={styles.listCon}></View>
        <View style={styles.controls}>
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
        <ScannerModal
          getRef={ref => (scannerRef.current = ref)}
          getCode={code => {
            setSearch(code);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
