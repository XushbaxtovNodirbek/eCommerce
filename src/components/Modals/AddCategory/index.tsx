import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {ModalProps} from '../ModalProps';
import TextInput from 'components/TextInput';
import {Dropdown} from 'react-native-element-dropdown';
import {api} from 'api';
import {Button} from 'react-native-paper';
import logger from 'helpers/logger';

const AddCategoryModal = ({getRef}: ModalProps) => {
  const [units, setUnits] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let ref = {
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    };

    getRef(ref);
    getUnits();
  }, []);

  useEffect(() => {
    setError('');
  }, [name, selected]);

  const getUnits = useCallback(() => {
    api
      .get('/units')
      .then(data => {
        setUnits(data.data);
      })
      .catch(err => {
        logger(err);
      });
  }, []);

  const createCategory = useCallback(
    (category: {name: string; unit_id: number}) => {
      if (category.name === '') {
        setError('Kategoriya nomi bo`sh bo`lishi mumkin emas');
        return;
      }
      if (category.unit_id === 0) {
        setError('Birlik tanlanmagan');
        return;
      }

      api
        .post('/categories', category)
        .then(data => {
          logger(data);
          setName('');
          setSelected('');
          setError('');
          setVisible(false);
        })
        .catch(err => {
          logger(err);
          setError('Xatolik yuz berdi');
        });
    },
    [],
  );

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.7}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      onBackdropPress={() => {
        setUnits([]);
        setSelected('');
        setVisible(false);
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Kategoriya Qo'shish</Text>
        <Text
          numberOfLines={2}
          style={{
            color: color.alizarin,
            marginBottom: 5,
          }}>
          {error}
        </Text>
        <TextInput
          placeholder="Kategoriya nomi..."
          value={name}
          setValue={setName}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.text}
          iconStyle={styles.iconStyle}
          data={units}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Birlikni tanlang..."
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            // @ts-ignore
            setSelected(item.id);
          }}
        />
        <Button
          onPress={() => {
            createCategory({name, unit_id: +selected});
          }}
          mode="contained"
          textColor="white"
          style={{
            width: '90%',
            marginTop: 10,
            backgroundColor: color.brandColor,
            borderRadius: 10,
          }}>
          Saqlash
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1.2,
    borderColor: color.gray,
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 8,
    height: 45,
  },
  placeholderStyle: {
    fontSize: 16,
    color: color.textColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: color.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: color.textColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: color.textColor,
  },
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.ManropeMedium,
    color: color.textColor,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.ManropeBold,
    color: 'rgba(0,0,0,0.6)',
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
});

export default AddCategoryModal;
