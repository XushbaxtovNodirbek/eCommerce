import {StyleSheet} from 'react-native';
import fonts from './fonts';
import color from './color';

export default StyleSheet.create({
  textStyle: {},
  background: {},
  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 11,
    fontFamily: fonts.ManropeSemiBold,
  },
});
