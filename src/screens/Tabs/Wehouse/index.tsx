import {api} from 'api';
import requests from 'api/requests';
import {EditIcon, SearchIcon} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import {AddAmount, AddBtn, TextInput} from 'components';
import logger from 'helpers/logger';
import {navigate} from 'navigators/NavigationService';
import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshControl, Swipeable} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import useStore from 'store';

const {width, height} = Dimensions.get('window');
const Werhouse = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');
  const [tabs, setTabs] = React.useState([{id: 0, name: 'Barchasi'}]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [products, setProducts] = React.useState<any>([]);

  const categories = useStore(state => state.categories);

  const currentOffset = React.useRef(0);
  const addBtnRef = React.useRef(null);
  const addAmount = React.useRef(null);

  useEffect(() => {
    getCategories();
    getProducts(0, search);

    return navigation.addListener('focus', () => {
      getCategories();
      getProducts(0, search);
    });
  }, []);

  useEffect(() => {
    if (activeTab === 0) {
      getProducts(0, search);
    } else {
      getProducts(activeTab, search);
    }
  }, [activeTab, search]);

  const getCategories = useCallback(() => {
    requests.fetchCategories();
    let data = categories;
    let newTabs = [{id: 0, name: 'Barchasi'}];
    data.forEach((item: any) => {
      newTabs.push({id: item.id, name: item.name});
    });
    setTabs(newTabs);
  }, []);

  const getProducts = useCallback((id = 0, search = '') => {
    setRefreshing(true);
    api
      .get(
        id
          ? `/products?filter[category_id]=${id}&sort=id&include=category.unit&search=${search}`
          : `/products?include=category.unit&sort=id&search=${search}`,
      )
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        logger(err);
      })
      .finally(() => setRefreshing(false));
  }, []);

  const onRefresh = useCallback(() => {
    getCategories();
    if (activeTab) {
      getProducts(activeTab, search);
    } else {
      getProducts(0, search);
    }
  }, [activeTab]);

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

  const renderLeftActions = (item: any) => {
    return (
      <View style={styles.leftActionsContainer}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.leftAction}
            onPress={() => {
              // @ts-ignore
              addAmount.current?.open(item);
            }}>
            <Avatar.Text
              label="+"
              size={40}
              color="#000"
              style={{backgroundColor: 'white'}}
            />
          </TouchableOpacity>
          <Text style={[styles.textStyle, {fontSize: 11}]}>Qoshish</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.leftAction, {backgroundColor: color.white}]}
            onPress={() => navigate('AddProduct', {item})}>
            <EditIcon size={24} />
          </TouchableOpacity>
          <Text style={[styles.textStyle, {fontSize: 11}]}>Tahrirlash</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.center}>
      <AddBtn getRef={r => (addBtnRef.current = r)} />
      <AddAmount getRef={r => (addAmount.current = r)} onRefresh={onRefresh} />
      <View style={styles.searchWrapper}>
        <TextInput
          width={width - 20}
          value={search}
          setValue={setSearch}
          placeholder="Qidirish..."
          rightIcon={<SearchIcon size={20} />}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveTab(item.id)}
              style={[
                styles.tab,
                activeTab === item.id && {
                  borderBottomWidth: 1,
                  borderBottomColor: color.brandColor,
                },
              ]}>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === item.id && {color: color.brandColor},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        style={{width: '100%', zIndex: 0}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={onScroll}
        data={products}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => renderLeftActions(item)}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.item,
                item.remind <= item.min_amount && {
                  backgroundColor: '#FFE0AD',
                },
              ]}>
              <Avatar.Text size={30} label={item.id} />
              <View style={styles.itemRight}>
                <View>
                  <Text style={[styles.textStyle]}>{item.name}</Text>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <View>
                      <Text style={[styles.textStyle, {fontSize: 10}]}>
                        Mavjud
                      </Text>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 14,
                            color: color.descColor,
                            textAlign: 'center',
                          },
                        ]}>
                        {item.remind ? item.remind : 0}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.textStyle, {fontSize: 10}]}>
                        Minimal soni
                      </Text>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 14,
                            color: color.descColor,
                            textAlign: 'center',
                          },
                        ]}>
                        {item.min_amount ? item.min_amount : 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={[styles.textStyle]}>
                    {item.category.unit.name}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {fontSize: 14, color: color.descColor},
                    ]}>
                    {item.price} so'm
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftActionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    gap: 10,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 3,
  },
  itemRight: {
    width: width - 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchWrapper: {
    width: '100%',
    backgroundColor: color.white,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 2,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabLabel: {
    color: color.descColor,
    fontFamily: fonts.ManropeMedium,
    fontSize: 14,
  },
  textStyle: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 16,
    color: color.black,
  },
  item: {
    width: width - 20,
    height: 80,
    backgroundColor: color.white,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default Werhouse;
