import {api} from 'api';
import {ArrowRight, Close} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {AddListModal} from 'components';
import logger from 'helpers/logger';
import numberWithSpaces from 'helpers/numberWithSpaces';
import {navigate} from 'navigators/NavigationService';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import useStore from 'store';

const Basket = () => {
  const addListRef = React.useRef(null);
  const [data, setData] = React.useState<any>(
    useStore(state => state.lists.data),
  );
  const [_meta, setMeta] = React.useState<any>(
    useStore(state => state.lists._meta),
  );
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (!data.length) getData();
  }, []);

  const getData = useCallback((page = 1, oldData = []) => {
    setRefreshing(true);
    // fetch data
    api
      .get(
        `/product-lists?include=totalSum,totalProductCount,customer&page=${page}&sort=-id&per-page=8`,
      )
      .then(({data, _meta}: any) => {
        logger({_meta});
        let newData = [...oldData, ...data];
        setData(newData);
        setMeta(_meta);
        useStore.setState({lists: {data: newData, _meta}});
      })
      .catch(err => {
        logger(err);
        Toast.show({
          type: 'error',
          text1: 'Xatolik',
          text2: "Ma'lumotlar olishda xatolik yuz berdi",
        });
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const action = useCallback(
    (id: number, type: 'accept' | 'return' | 'pay') => {
      api
        .post(`/product-lists/${type}/${id}`)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Muvaffaqiyatli',
            text2: 'Amal bajarildi',
          });
          getData();
        })
        .catch(err => {
          logger(err);
          Toast.show({
            type: 'error',
            text1: 'Xatolik',
            text2: err?.message,
          });
        });
    },
    [],
  );

  const onEndReached = useCallback(() => {
    logger({_meta});

    if (_meta?.currentPage === _meta?.pageCount) {
      return;
    }
    getData(_meta?.currentPage + 1, data);
  }, [_meta]);

  return (
    <View style={globalStyles.center}>
      <FlatList
        style={{width: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => getData()} />
        }
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Tovarlar</Text>
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                addListRef.current.open();
              }}>
              <Avatar.Text size={35} label="+" />
            </TouchableOpacity>
          </View>
        )}
        onEndReached={onEndReached}
        contentContainerStyle={{paddingVertical: 10}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('ListView', item)}
            style={styles.item}>
            <View style={styles.row}>
              <View>
                <Text style={styles.itemID}>No. {item.id}</Text>
                <Text style={styles.text1}>Kelish vaqti:</Text>
                <Text style={styles.text1}>Tovarlar soni:</Text>
                <Text style={styles.text1}>Summa:</Text>
              </View>
              <View style={styles.right}>
                <View
                  style={{
                    backgroundColor:
                      item?.status === 0 ? color.gray : color.green,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.itemID, {color: '#fff', fontSize: 14}]}>
                    {item?.status === 0
                      ? 'Qoralama'
                      : item?.status === 1
                      ? 'To`lov kutilmoqda'
                      : 'To`lov qilindi'}
                  </Text>
                </View>
                <Text style={styles.text1}>
                  {item.date
                    ? convertTimestampToDate(item.date * 1000)
                    : 'Belgilanmagan'}
                </Text>
                <Text style={styles.text1}>{item?.totalProductCount || 0}</Text>
                <Text style={styles.text1}>
                  {numberWithSpaces(item.totalSum)} so'm
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                {
                  backgroundColor: color.lgray,
                  paddingVertical: 10,
                  marginTop: 5,
                },
              ]}>
              <Text style={styles.text1}>Olib keluvchi:</Text>
              <Text style={styles.text1}>{item.customer?.full_name}</Text>
            </View>
            {item.status === 0 ? (
              <TouchableOpacity
                onPress={() => action(item.id, 'accept')}
                activeOpacity={0.8}
                style={[
                  styles.row,
                  {paddingVertical: 8, backgroundColor: color.brandColor},
                ]}>
                <Text style={[styles.text1, {fontSize: 15, color: '#fff'}]}>
                  Qabul qilish
                </Text>
                <ArrowRight size={20} color="#fff" />
              </TouchableOpacity>
            ) : item.status === 1 ? (
              <View style={[styles.row, {paddingHorizontal: 0}]}>
                <TouchableOpacity
                  onPress={() => action(item.id, 'return')}
                  style={[
                    styles.row,
                    {
                      paddingVertical: 8,
                      backgroundColor: color.alizarin,
                      width: '50%',
                    },
                  ]}>
                  <Text style={[styles.text1, {fontSize: 15, color: '#fff'}]}>
                    Ortga
                  </Text>
                  <Close size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => action(item.id, 'pay')}
                  style={[
                    styles.row,
                    {
                      paddingVertical: 8,
                      width: '50%',
                      backgroundColor: color.green,
                    },
                  ]}>
                  <Text style={[styles.text1, {fontSize: 15, color: '#fff'}]}>
                    To'lov qilish
                  </Text>
                  <ArrowRight size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
      <AddListModal
        onRefresh={() => getData()}
        getRef={r => (addListRef.current = r)}
      />
    </View>
  );
};

function convertTimestampToDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const styles = StyleSheet.create({
  right: {
    alignItems: 'flex-end',
  },
  text1: {
    fontSize: 15,
    fontFamily: fonts.ManropeSemiBold,
    color: color.textColor,
  },
  itemID: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: fonts.ManropeBold,
    color: color.textColor,
    marginVertical: 2,
  },
  item: {
    width: '95%',
    backgroundColor: color.white,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
    elevation: 2,
    paddingTop: 10,
    overflow: 'hidden',
  },
  headerTxt: {
    fontSize: 20,
    fontFamily: fonts.ManropeBold,
    color: color.textColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Basket;
