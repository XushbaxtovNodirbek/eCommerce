import React, {useCallback, useEffect} from 'react';
import {ModalProps} from '../ModalProps';
import Modal from 'react-native-modal';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import TextInput from 'components/TextInput';
import {Button, Switch} from 'react-native-paper';
import {api} from 'api';

const UnitModal = ({getRef}: ModalProps) => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const [str, setStr] = React.useState('');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [error, setError] = React.useState('');
  // false 1
  // true 2

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    setError('');
  }, [str, isSwitchOn]);

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
        setStr(data?.name);
        setIsSwitchOn(data?.value_type !== 1);
      },
      close: () => {
        setVisible(false);
      },
    };

    getRef(ref);
  }, [getRef]);

  const handleSave = useCallback(
    ({name, value_type}: {name: string; value_type: number}) => {
      if (!name) {
        setError('Birlikni kiritish shart');
        return;
      }
      if (data) {
        api
          .put('/units/' + data.id, {
            name,
            value_type,
          })
          .then(data => {
            console.log(data);
            setError('Muvaffaqiyatli yangilandi');
            setTimeout(() => {
              setVisible(false);
            }, 2000);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .post('/units', {name, value_type})
          .then(data => {
            console.log(data);
            setStr('');
            setIsSwitchOn(false);
            setTimeout(() => {
              setError("Muvaffaqiyatli qo'shildi");
            }, 500);
          })
          .catch(err => {
            console.log(err);
          });
      }
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
          value={str}
          setValue={setStr}
          placeholder="Birlikni kiriting"
        />

        <View style={styles.row}>
          <Switch
            value={isSwitchOn}
            color={color.brandColor}
            onValueChange={onToggleSwitch}
          />
          <Text style={styles.text2}>Dona</Text>
        </View>

        <Button
          style={{backgroundColor: color.brandColor}}
          mode="contained"
          onPress={() =>
            handleSave({name: str, value_type: isSwitchOn ? 2 : 1})
          }
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

export default UnitModal;
