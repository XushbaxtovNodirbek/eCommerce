import {api} from 'api';
import {CallIcon, SearchIcon} from 'icons';
import color from 'assets/styles/color.ts';
import fonts from 'assets/styles/fonts.ts';
import globalStyles from 'assets/styles/globalStyles.ts';
import {AddBtn, TextInput} from 'componets';
import logger from 'helpers/logger';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator, Avatar} from 'react-native-paper';
// import Sellers from '../Sellers';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {navigate} from 'navigators/NavigationService.ts';
import useStore from 'store';

type Customer = {
  address: string;
  balance: {
    balance: number;
    credit: number;
    debit: number;
  };
  created_at: number;
  deleted_at: number;
  full_name: string;
  id: number;
  phone_number: string;
  status: any;
  updated_at: number;
  user_id: any;
};

const Customers = () => {
  const CustomersRoute = useCallback(() => {
    const [customers, setCustomers] = useState<Customer[]>(
      useStore(state => state.customers.data),
    );
    const [meta, setMeta] = useState<{
      currentPage: number;
      pageCount: number;
      perPage: number;
      totalCount: number;
    }>(useStore(state => state.customers._meta));
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const addBtnRef = React.useRef(null);
    const currentOffset = React.useRef(0);

    useEffect(() => {
      if (!customers.length) getCustomers(search);
    }, [search]);

    const getCustomers = useCallback((search = '') => {
      setRefreshing(true);
      api
        .get(`/customers?search=${search}`)
        .then(res => {
          // @ts-ignore
          setMeta(res?._meta);
          setCustomers(res.data);
          // @ts-ignore
          useStore.setState({customers: {data: res.data, _meta: res?._meta}});
        })
        .catch(err => {
          logger(err);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }, []);

    const onRefresh = useCallback(() => {
      getCustomers();
    }, [search]);

    const reachEnd = () => {
      console.log(meta?.currentPage, meta?.pageCount);

      if (meta?.currentPage === meta?.pageCount) {
        return;
      }
      api
        // @ts-ignore
        .get(`/customers?page=${meta?.currentPage + 1}`)
        .then((res: any) => {
          setMeta(res?._meta);
          let newCustomers = [...customers, ...res.data];
          setCustomers(newCustomers);

          useStore.setState({
            customers: {data: newCustomers, _meta: res?._meta},
          });
        })
        .catch(err => {
          logger(err);
        });
    };

    const onScroll = (event: any) => {
      const newOffset = event.nativeEvent.contentOffset.y;
      if (newOffset > currentOffset.current) {
        // @ts-ignore
        addBtnRef.current?.hide();
      } else {
        // @ts-ignore
        addBtnRef.current?.show();
      }

      currentOffset.current = newOffset;
    };
    return (
      <View style={globalStyles.center}>
        <View style={styles.searchWrapper}>
          <TextInput
            width={width - 20}
            value={search}
            setValue={setSearch}
            placeholder="Qidirish..."
            rightIcon={<SearchIcon size={20} />}
          />
        </View>
        <FlatList
          onEndReached={reachEnd}
          style={{width: '100%'}}
          data={customers}
          onScroll={onScroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => (
            <ActivityIndicator
              size={'small'}
              style={[
                {margin: 10},
                meta?.currentPage === meta?.pageCount && {display: 'none'},
              ]}
            />
          )}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigate('CustomerInfo', item)}
                activeOpacity={0.8}
                style={styles.item}>
                <View style={styles.itemLeftComp}>
                  <Avatar.Text size={40} label={item.full_name[0]} />
                  <View style={{gap: 5}}>
                    <Text style={styles.full_name}>{item.full_name}</Text>
                    <Text
                      style={[
                        styles.balance,
                        item.balance.balance >= 0 && {color: 'green'},
                      ]}>
                      {'Balans: '}
                      {item.balance.balance}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item.phone_number}`);
                  }}
                  style={styles.call}>
                  <CallIcon size={20} color={color.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }, []);

  // const SellersRoute = () => <Sellers />;

  const renderScene = SceneMap({
    first: CustomersRoute,
    // second: SellersRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Mijozlar'},
    {key: 'second', title: 'Ishchilar'},
  ]);

  return (
    // <TabView
    //   navigationState={{index, routes}}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={{width: width}}
    //   renderTabBar={props => (
    //     <TabBar
    //       {...props}
    //       indicatorStyle={{backgroundColor: color.brandColor}}
    //       style={{backgroundColor: color.white}}
    //       activeColor={color.brandColor}
    //       inactiveColor={color.gray}
    //     />
    //   )}
    // />
    <CustomersRoute />
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  searchWrapper: {
    width: '100%',
    height: 70,
    backgroundColor: color.white,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingTop: 5,
    marginBottom: 2,
  },
  call: {
    backgroundColor: color.green,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: 60,
    backgroundColor: color.white,
    width: width - 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  itemLeftComp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  full_name: {
    color: color.textColor,
    fontSize: 14,
    fontFamily: fonts.ManropeMedium,
  },
  balance: {
    color: color.alizarin,
    fontSize: 12,
  },
});

export default Customers;
