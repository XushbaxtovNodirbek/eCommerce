import {api} from 'api';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import logger from 'helpers/logger';
import numberWithSpaces from 'helpers/numberWithSpaces';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, ScrollView, Swipeable} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import useStore from 'store';
import AddProductToListModal from './AddProductToListModal';
import {DeleteIcon, EditIcon} from 'assets/icons';

const ListView = ({navigation, route}: any) => {
  const [data, setData] = useState<any>(null);
  const categories = useStore(state => state.categories);

  const modalRef = React.useRef<any>(null);

  useEffect(() => {
    // Add your code here
    fetchData(route.params?.id);
    logger(route.params);
  }, []);

  const fetchData = useCallback((id = 1) => {
    api
      .get(`/product-histories?filter[product_list_id]=${id}&include=product`)
      .then((res: any) => {
        logger(res);

        setData(res);
      })
      .catch(logger);
  }, []);

  const renderLeftActions = (item: any) => {
    return (
      <View style={styles.leftActionsContainer}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.leftAction, {backgroundColor: color.white}]}
            onPress={() => {
              Alert.alert(
                'Ogohlantirish',
                "Haqiqatdan ham mahsuloni o'chirmoqchimisiz?",
                [
                  {
                    text: "Yo'q",
                    onPress: () => {},
                  },
                  {
                    text: 'Ha',
                    onPress: () => {},
                  },
                ],
              );
            }}>
            <DeleteIcon size={24} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.text, {fontSize: 11}]}>Qoshish</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.leftAction, {backgroundColor: color.white}]}
            onPress={() => {}}>
            <EditIcon size={24} />
          </TouchableOpacity>
          <Text style={[styles.text, {fontSize: 11}]}>Tahrirlash</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.center}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order &#8470; {route.params?.id}</Text>
      </View>
      <View style={styles.info}>
        <View>
          <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}>
            Olib keluvchi:
          </Text>
          <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}>
            Mahsulotlar soni:
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}>
            {route?.params?.customer?.full_name || 'nomalum'}
          </Text>
          <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}>
            {data?._meta?.totalCount || 0} dona
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{padding: 10}}
        style={{width: '100%'}}
        data={data?.data}
        keyExtractor={(item: any) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchData} />
        }
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 15}]}>
              Mahsulotlar
            </Text>
            <TouchableOpacity
              onPress={() => modalRef.current.open(route.params?.id)}
              activeOpacity={0.8}>
              <Avatar.Text size={30} label="+" />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => renderLeftActions(item)}>
            <View style={styles.item}>
              <Avatar.Text size={30} label={item?.product_id} />
              <View style={styles.itemRight}>
                <View>
                  <Text style={[styles.text]}>
                    {item?.product?.name || 'product'}
                  </Text>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <View>
                      <Text style={[styles.text, {fontSize: 10}]}>
                        Kelish narxi
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            fontSize: 12,
                            color: color.descColor,
                            textAlign: 'center',
                          },
                        ]}>
                        {numberWithSpaces(Number(item.price)) || 0}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.text, {fontSize: 10}]}>
                        Sotish narxi
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            fontSize: 12,
                            color: color.descColor,
                            textAlign: 'center',
                          },
                        ]}>
                        {numberWithSpaces(Number(item.sale_price)) || 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={[styles.text]}>
                    {item.amount}{' '}
                    {categories.find(
                      (i: any) => i.id === item?.product?.category_id,
                    )?.unit?.name || 'unit'}
                  </Text>
                  <Text style={styles.text}>
                    {numberWithSpaces(Number(item.amount) * Number(item.price))}{' '}
                    {" so'm"}
                  </Text>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />
      <AddProductToListModal
        getRef={r => (modalRef.current = r)}
        onRefresh={() => {
          fetchData(route.params?.id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  item: {
    width: '100%',
    height: 80,
    backgroundColor: color.white,
    elevation: 5,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemRight: {
    width: '86%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: color.textColor,
    fontFamily: fonts.ManropeBold,
  },
  info: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: color.textColor,
    fontFamily: fonts.ManropeMedium,
  },
});

export default ListView;
