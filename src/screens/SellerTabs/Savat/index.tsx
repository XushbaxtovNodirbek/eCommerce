import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import color from 'assets/styles/color.ts';
import {Button, Text} from 'react-native-paper';
import EmptyBox from 'assets/icons/EmptyBox.tsx';
import {navigate} from 'navigators/NavigationService.ts';
import {useEffect, useRef} from 'react';
import useController from './useController';
import {get} from 'lodash';
import fonts from 'assets/styles/fonts.ts';
import numberWithSpaces from 'helpers/numberWithSpaces';
import Accept from 'assets/icons/Accept.tsx';
import CloseOrder from 'assets/icons/CloseOrder.tsx';
import {useFocusEffect} from '@react-navigation/native';
import CompleateOrder from 'components/Modals/CompleateOrder';

const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

const Savat = () => {
  const {getAll, baskets, createOrder} = useController();
  const modalRef = useRef(null);

  useFocusEffect(getAll);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Wrapper
      style={{flex: 1, backgroundColor: color.lgray}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          data={baskets}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigate('CreateOrder', {id: get(item, 'id')})}
              style={styles.item}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.text}>Buyurtma No: {get(item, 'id')}</Text>
                <Text
                  style={[
                    styles.text,
                    {fontFamily: fonts.ManropeSemiBold, fontSize: 17},
                  ]}>
                  {numberWithSpaces(get(item, 'orderSum'))} so'm
                </Text>
                {/*<Text style={styles.text}>*/}
                {/*  Mahsulotlar soni: {get(item, 'orderGoodsCount')}*/}
                {/*</Text>*/}
              </View>

              <View
                style={{
                  flexDirection: 'row-reverse',
                  gap: 10,
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    modalRef.current.open(
                      get(item, 'id', 0),
                      get(item, 'orderSum', 0),
                    );
                  }}
                  style={styles.btn1}>
                  <Accept />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1}>
                  <CloseOrder />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={ListEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getAll} />
          }
        />
      </View>
      <Button
        style={styles.btn}
        mode={'contained'}
        buttonColor={'#80a6ff'}
        onPress={createOrder}
        textColor={'white'}>
        Order yaratish
      </Button>
      <CompleateOrder
        getRef={ref => {
          return (modalRef.current = ref);
        }}
      />
    </Wrapper>
  );
};

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyCon}>
      <EmptyBox width={100} height={100} />
      <Text style={styles.emptyText}>Savat bo'sh</Text>
    </View>
  );
};
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.lgray,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    color: color.textColor,
    fontFamily: fonts.ManropeMedium,
  },
  emptyCon: {
    flex: 1,
    height: height - 140,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: color.red,
  },
  btn: {
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    color: color.textColor,
  },
  item: {
    margin: 10,
    marginBottom: 0,
    minHeight: 100,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
  },
  btn1: {
    height: 27,
    width: 27,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: color.gray,
    borderWidth: 1,
  },
});
export default Savat;
