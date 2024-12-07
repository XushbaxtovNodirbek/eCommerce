import React, {useCallback, useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {ModalProps} from 'components/Modals/ModalProps.ts';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import color from 'assets/styles/color.ts';
import numberWithSpaces from 'helpers/numberWithSpaces';
import CustomInput from 'components/TextInput';
import {api} from 'api';
import {get, isEmpty} from 'lodash';
import {AddPerson, Person} from 'icons';
import AddCustomer from 'components/Modals/AddCustomer';
import Toast from 'react-native-toast-message';

const CompleteOrder = ({getRef}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [orderSum, setOrderSum] = useState(0);
  const [suggestedSum, setSuggestedSum] = useState(0);
  const {width, height} = useWindowDimensions();
  const [error, setError] = useState(false);
  const [customer, setCustomer] = useState<any>();
  const [close, setClose] = useState(false);
  const [customerList, setCustomerList] = useState<any[]>([
    {name: 'Ali'},
    {name: 'Vali'},
    {name: 'Soli'},
    {name: 'Boli'},
    {name: 'Moli'},
  ]);
  const [searchCustomer, setSearchCustomer] = useState('');

  const [transactions, setTransactions] = useState({
    cash: 0,
    card: 0,
    debt: 0,
  });
  const addCustomer = useRef();

  useEffect(() => {
    setClose(false);
    if (searchCustomer.length > 3 && !close) {
      api
        .get(`/customers?sort=-id&per-page=50&search=${searchCustomer}`)
        .then(({data}) => {
          setCustomerList(data);
        });
    }
  }, [searchCustomer]);

  useEffect(() => {
    setSearchCustomer(get(customer, 'full_name', ''));
    setSearchCustomer(get(customer, 'full_name', ''));
    setClose(true);
    setCustomerList([]);
  }, [customer]);

  const onClose = () => {
    setIsVisible(false);
    setCustomer({});
    setTransactions({
      cash: 0,
      card: 0,
      debt: 0,
    });
  };

  useEffect(() => {
    getRef({
      open: (orderId: number, orderSum: number) => {
        setIsVisible(true);
        setOrderId(orderId);
        setOrderSum(orderSum);
        setSuggestedSum(orderSum);
      },
    });
  }, []);

  useEffect(() => {
    setSuggestedSum(orderSum - transactions.cash - transactions.card);
    if (orderSum - transactions.cash - transactions.card < 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [transactions]);

  const accept = useCallback(() => {
    const data = {payments: []};
    if (transactions.cash) {
      // @ts-ignore
      data.payments.push({payment_type: 1, amount: transactions.cash});
    }
    if (transactions.card) {
      // @ts-ignore
      data.payments.push({payment_type: 2, amount: transactions.card});
    }
    if (suggestedSum) {
      // @ts-ignore
      data.payments.push({
        payment_type: 2,
        amount: suggestedSum,
        customer_id: customer.id,
      });
    }
    api.post(`/orders/accept/${orderId}`, data).then(({data}) => {
      setIsVisible(false);
      setCustomer({});
      Toast.show({
        text1: 'Muvaqqiyatli',
        text2: 'Order tasdiqlandi',
      });
    });
  }, [transactions, customer, suggestedSum]);

  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      animationInTiming={300}
      deviceWidth={width}
      deviceHeight={height}
      style={styles.modal}
      backdropColor={color.gray}
      isVisible={isVisible}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Buyurtma {orderId}</Text>
        <Text style={styles.text}>
          Umumiy hisob {numberWithSpaces(orderSum)} so'm
        </Text>
        <Text style={styles.text}>Naxt to'lov</Text>
        <INPUT
          error={error}
          value={transactions.cash}
          onChangeText={text =>
            setTransactions(pr => ({
              ...pr,
              cash: Number(text.replaceAll(' ', '')),
            }))
          }
          suggestion={suggestedSum}
        />
        <Text style={styles.text}>Plastik orqali to'lov</Text>
        <INPUT
          error={error}
          value={transactions.card}
          onChangeText={text =>
            setTransactions(pr => ({
              ...pr,
              card: Number(text.replaceAll(' ', '')),
            }))
          }
          suggestion={suggestedSum}
        />
        <Text style={styles.text}>Qarzga yozish</Text>
        <INPUT
          error={error}
          value={suggestedSum}
          readOnly
          onChangeText={text =>
            setTransactions(pr => ({
              ...pr,
              debt: Number(text.replaceAll(' ', '')),
            }))
          }
          suggestion={0}
        />
        <CustomInput
          value={searchCustomer}
          setValue={setSearchCustomer}
          placeholder="Mijoz qidirish..."
          width={'100%'}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                addCustomer.current?.open();
              }}>
              <AddPerson />
            </TouchableOpacity>
          }
        />
        {searchCustomer.length > 2 && !close && customerList.length > 0 && (
          <View style={styles.customersCon}>
            {customerList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.customers}
                onPress={() => {
                  setCustomer(item);
                }}>
                <Text style={styles.text}>{item.full_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Button
        mode="contained"
        onPress={accept}
        style={{margin: 15, backgroundColor: color.brandColor}}>
        <Text style={[styles.text, {color: color.white}]}>Tasdiqlash</Text>
      </Button>
      <AddCustomer
        setCustomer={setCustomer}
        getRef={ref => {
          return (addCustomer.current = ref);
        }}
      />
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: color.white,
    padding: 15,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
    color: color.textColor,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Manrope-Medium',
    color: color.textColor,
  },
  textInput: {
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.brandColor,
    marginRight: 5,
    overflow: 'hidden',
    padding: 1,
  },
  suggest: {
    backgroundColor: color.lgray,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  customers: {
    backgroundColor: color.lgray,
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  customersCon: {
    maxHeight: 110,
    overflow: 'scroll',
    position: 'absolute',
    width: '100%',
    backgroundColor: color.white,
    zIndex: 1,
    bottom: 75,
    left: 15,
    right: 0,
    alignSelf: 'center',
  },
});

type CheckBoxProps = {
  title: string;
  checked: boolean;
  onPress?: () => void;
};

const CheckBox = ({title, checked, onPress}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <View style={styles.box}>
        {checked && (
          <View
            style={{
              flex: 1,
              backgroundColor: color.brandColor,
              borderRadius: 4,
            }}
          />
        )}
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

type InputProps = {
  value: number;
  error?: boolean;
  onChangeText: (text: string) => void;
  suggestion: number;
  readonly?: boolean;
  readOnly?: boolean;
};

const INPUT = ({
  value,
  suggestion,
  onChangeText,
  readOnly,
  error,
  ...props
}: InputProps & ViewProps) => {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <View {...props} style={{position: 'relative'}}>
      <View style={[styles.textInput, error && {borderColor: color.alizarin}]}>
        <TextInput
          style={[
            styles.text,
            {padding: 0, width: '80%'},
            error && {color: color.alizarin},
          ]}
          placeholder={'0'}
          readOnly={readOnly}
          value={String(numberWithSpaces(value))}
          onChangeText={onChangeText}
          placeholderTextColor={color.gray}
          onFocus={() => setIsFirst(false)}
          numberOfLines={1}
          keyboardType={'numeric'}
        />
        <Text
          style={[styles.text, {color: error ? color.alizarin : color.gray}]}>
          So'm
        </Text>
      </View>
      {isFirst && Boolean(suggestion) && (
        <TouchableOpacity
          disabled={readOnly}
          style={styles.suggest}
          onPress={() => {
            onChangeText(suggestion.toString());
            setIsFirst(false);
          }}>
          <Text style={{color: 'rgba(0,0,0,0.8)'}}>
            {numberWithSpaces(suggestion)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CompleteOrder;
