import color from 'assets/styles/color';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {CloseIcon} from 'assets/icons';

type ModalProps = {
  getRef: (ref: any) => void;
  getCode: (code: string) => void;
};

const ScannerModal = ({getRef, getCode}: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    let ref = {
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    };
    getRef(ref);
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      if (codes[0].value) {
        let code = codes[0].value;
        setTimeout(() => {
          getCode(code);
          setVisible(false);
        }, 1000);
      }
    },
  });

  return (
    <Modal
      animationIn="fadeInRightBig"
      animationOut="fadeOutRightBig"
      backdropOpacity={1}
      style={styles.modal}
      isVisible={visible}>
      <TouchableOpacity
        onPress={() => {
          setVisible(false);
        }}
        style={{position: 'absolute', right: 15, top: 15}}>
        <CloseIcon color="white" size={20} />
      </TouchableOpacity>
      <View style={styles.container}>
        {device && (
          <Camera
            isActive={true}
            device={device}
            style={StyleSheet.absoluteFill}
            codeScanner={codeScanner}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '90%',
    backgroundColor: color.white,
  },
});

export default ScannerModal;
