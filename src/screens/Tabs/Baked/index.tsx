import {api} from 'api';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {AddListModal} from 'components';
import logger from 'helpers/logger';
import numberWithSpaces from 'helpers/numberWithSpaces';
import time from 'helpers/time';
import {navigate} from 'navigators/NavigationService';
import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Basket = () => {
  const addListRef = React.useRef(null);
  const [data, setData] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback((page = 1) => {
    setRefreshing(true);
    // fetch data
    api
      .get(`/product-lists?include=totalSum,customer&page=${page}&sort=id`)
      .then(({data}: any) => {
        logger({data});
        setData(data);
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
        contentContainerStyle={{paddingVertical: 10}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigate('ListView', item)}
            style={styles.item}>
            <View style={styles.row}>
              <View>
                <Text style={styles.itemID}>No. {item.id}</Text>
                <Text style={styles.text1}>Kelish vaqti:</Text>
                <Text style={styles.text1}>Tovartar soni:</Text>
                <Text style={styles.text1}>Summa:</Text>
              </View>
              <View style={styles.right}>
                <View
                  style={{
                    backgroundColor:
                      item?.status === 0 ? color.lgray : color.green,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={styles.itemID}>
                    {item?.status === 0 ? 'Qoralama' : 'Nimadir'}
                  </Text>
                </View>
                <Text style={styles.text1}>
                  {item.date
                    ? convertTimestampToDate(item.date * 1000)
                    : 'Nomalum'}
                </Text>
                <Text style={styles.text1}>{item?.products?.length || 0}</Text>
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
          </Pressable>
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
    marginBottom: 5,
  },
  item: {
    width: '95%',
    backgroundColor: color.white,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
    elevation: 2,
    paddingVertical: 10,
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
