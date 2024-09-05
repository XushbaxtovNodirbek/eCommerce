import {api} from 'api';
import {CallIcon} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {AddBtn} from 'components';
import logger from 'helpers/logger';
import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';

type Seller = {
  id: number;
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
  auth_key: string;
  user_role: string;
  status: number;
  deleted_at: any;
  created_at: number;
  updated_at: number;
  access_token: any;
};

const Sellers = () => {
  const addBtnRef = React.useRef(null);
  const currentOffset = React.useRef(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sellers, setSellers] = React.useState<Seller[]>([]);
  const [meta, setMeta] = React.useState<{
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  }>();

  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = useCallback(() => {
    setRefreshing(true);
    api
      .get('/users?filter[user_role]=seller')
      // @ts-ignore
      .then(({data, _meta}) => {
        setSellers(data);
        logger(data);
        setMeta(_meta);
      })
      .catch(err => {
        logger(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

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

  const reachEnd = () => {
    if (meta?.currentPage === meta?.pageCount) {
      return;
    }
    api
      // @ts-ignore
      .get(`/users?filter[user_role]=seller&page=${meta?.currentPage + 1}`)
      // @ts-ignore
      .then(({data, _meta}) => {
        setMeta(_meta);
        // @ts-ignore
        setSellers([...sellers, ...data]);
      })
      .catch(err => {
        logger(err);
      });
  };

  const onRefresh = useCallback(() => {
    getSellers();
  }, []);

  return (
    <View style={globalStyles.center}>
      <AddBtn getRef={r => (addBtnRef.current = r)} />
      <View style={styles.searchWrapper}>
        <Text style={styles.title}>Ishchilar</Text>
      </View>
      <FlatList
        onEndReached={reachEnd}
        style={{width: '100%'}}
        data={sellers}
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
              activeOpacity={0.8}
              style={styles.item}
              key={item.id}>
              <View style={styles.itemLeftComp}>
                <Avatar.Text size={40} label={item.full_name[0]} />
                <View style={{gap: 5}}>
                  <Text style={styles.full_name}>{item.full_name}</Text>
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
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
  title: {
    color: color.textColor,
    fontSize: 22,
    fontFamily: fonts.ManropeBold,
  },
  call: {
    backgroundColor: color.green,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    width: '100%',
    height: 55,
    backgroundColor: color.white,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 2,
  },
});

export default Sellers;
