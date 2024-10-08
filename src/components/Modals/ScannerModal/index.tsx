import color from 'assets/styles/color';
import React, {useEffect, useMemo, useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

type ModalProps = {
  getRef: (ref: any) => void;
  getCode: (code: string) => void;
};

const ScannerModal = ({getRef, getCode}: ModalProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [250, 260], []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    let ref = {
      open: () => {
        bottomSheetModalRef.current?.present();
      },
      close: () => {
        bottomSheetModalRef.current?.dismiss();
      },
    };
    getRef(ref);
  }, [hasPermission, requestPermission, getRef]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      if (codes[0].value) {
        let code = codes[0].value;
        setTimeout(() => {
          getCode(code);
          bottomSheetModalRef.current?.dismiss();
        }, 100);
      }
    },
  });

  const renderBackdrop = (props: any) => (
    <Pressable
      style={[StyleSheet.absoluteFill]}
      onPress={() => bottomSheetModalRef.current?.dismiss()}
    />
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        bottomInset={0}
        style={styles.modal}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop} // Add backdrop here
      >
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
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  container: {
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    width: '90%',
    backgroundColor: color.white,
    overflow: 'hidden',
  },
});

export default ScannerModal;
