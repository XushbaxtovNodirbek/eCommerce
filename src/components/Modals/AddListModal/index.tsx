import React, {useCallback, useState} from 'react';
import {ModalProps} from '../ModalProps';
import Modal from 'react-native-modal';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Text} from 'react-native-paper';
import logger from 'helpers/logger';
import useStore from 'store';
import requests from 'api/requests';
import {api} from 'api';
import Toast from 'react-native-toast-message';
import {navigate} from 'navigators/NavigationService';
import DatePicker from 'react-native-date-picker';

const AddListModal = ({getRef, onRefresh}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const customers = useStore(state => state.customers);
  const [isEdit, setIsEdit] = useState(false);
  const [listId, setListId] = useState<null | number>(null);

  const [open, setOpen] = useState(false);

  const addList = useCallback(
    (data: any) => {
      if (!data.customer_id) {
        data = {date: data.date};
      }
      if (isEdit) {
        api
          .put(`/product-lists/${listId}`, data)
          .then(({data}) => {
            logger(data);
            setValue(0);
            if (onRefresh) {
              onRefresh();
            }
            setIsVisible(false);
            Toast.show({
              type: 'success',
              text1: 'Muvaffaqiyat',
              text2: 'List tahrirlandi',
            });
          })
          .catch(err => {
            logger(err);
            Toast.show({
              type: 'error',
              text1: 'Xatolik',
              text2: "Ma'lumotlar saqlanmadi",
            });
          });
      } else
        api
          .post('/product-lists', data)
          .then(({data}) => {
            logger(data);
            setValue(0);
            if (onRefresh) {
              onRefresh();
            }
            setIsVisible(false);
            navigate('ListView', data);
            Toast.show({
              type: 'success',
              text1: 'Muvaffaqiyat',
              text2: "List qo'shildi",
            });
          })
          .catch(err => {
            logger(err);
            Toast.show({
              type: 'error',
              text1: 'Xatolik',
              text2: "Ma'lumotlar saqlanmadi",
            });
          });
    },
    [isEdit, listId, onRefresh],
  );

  React.useEffect(() => {
    let ref = {
      open: (data: any) => {
        if (data) {
          logger(data);
          setValue(data.customer_id);
          setDate(new Date(data.date * 1000));
          setListId(data.id);
          setIsEdit(true);
        }
        setIsVisible(true);
      },
      close: () => {
        setIsVisible(false);
      },
    };

    getRef(ref);
  }, [getRef]);

  return (
    <Modal
      backdropColor={color.lgray}
      backdropOpacity={0.7}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isEdit ? 'Tahrirlash' : "List qo'shish"}
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={customers?.data}
          search
          onChangeText={text => {
            setTimeout(() => {
              requests.fetchCustomers(text);
            }, 1000);
          }}
          maxHeight={300}
          // @ts-ignore
          labelField="full_name"
          // @ts-ignore
          valueField="id"
          placeholder={!isFocus ? 'Olib keluvchini tanlang' : '...'}
          searchPlaceholder="Qidirish..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            // @ts-ignore
            setValue(item?.id);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.timePicker}>
          <Text style={styles.text2}>{date.toLocaleDateString()}</Text>
          <Text style={styles.text2}>Kelish vaqti</Text>
        </TouchableOpacity>
        <Button
          onPress={() =>
            addList({
              customer_id: value,
              date: Math.floor(Number(date.getTime()) / 1000),
            })
          }
          mode="contained"
          style={{marginTop: 10}}>
          {isEdit ? 'Tasdiqlash' : "Qo'shish"}
        </Button>
        <DatePicker
          modal
          mode="date"
          locale="uz"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default AddListModal;

const styles = StyleSheet.create({
  timePicker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '90%',
    backgroundColor: color.white,
  },
  title: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
    color: color.textColor,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  text2: {
    color: color.textColor,
    fontSize: 16,
    fontFamily: fonts.ManropeMedium,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  selectedTextStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    color: color.textColor,
    height: 40,
    fontSize: 16,
  },
});
