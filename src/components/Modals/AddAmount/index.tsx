import React, {useCallback, useEffect} from 'react';
import {ModalProps} from '../ModalProps';
import Modal from 'react-native-modal';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import TextInput from 'components/TextInput';
import {Button} from 'react-native-paper';
import {api} from 'api';

const AddAmount = ({getRef}: ModalProps) => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState('');
  // false 1
  // true 2

  useEffect(() => {
    setError('');
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 2000);
  }, [error]);

  useEffect(() => {
    let ref = {
      open: (data: any) => {
        setVisible(true);
        setData(data);
      },
      close: () => {
        setVisible(false);
      },
    };

    getRef(ref);
  }, [getRef]);

  const handleSave = useCallback(
    (product: any) => {
      if (!product.remind) {
        setError('Miqdorni kiriting');
        return;
      }
      api
        .post('/products/' + product.id, {...product, amount: product.remind})
        .then(res => {
          setError('Muvaffaqiyatli saqlandi');
        })
        .catch(err => {
          setError('Xatolik yuz berdi');
          console.log('handleSave', err);
        });
    },
    [data],
  );

  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={visible}
      style={styles.modal}
      deviceHeight={Dimensions.get('screen').height}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {data ? data?.name : 'Birlik yaratish'}
        </Text>
        <Text
          style={{
            color: error.startsWith('Muvaffaqiyatli')
              ? color.green
              : color.alizarin,
            marginBottom: 4,
          }}>
          {error}
        </Text>
        <TextInput
          isNumber
          value={data?.remind ? data.remind : ''}
          setValue={value => {
            setData({...data, remind: value});
          }}
          placeholder="Sonni kiriting"
        />

        <Button
          style={{backgroundColor: color.brandColor}}
          mode="contained"
          onPress={() => {
            handleSave(data);
          }}
          textColor={color.white}>
          Saqlash
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {margin: 0, alignItems: 'center', justifyContent: 'center'},
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
});

export default AddAmount;
