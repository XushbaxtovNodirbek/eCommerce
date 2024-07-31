import {StyleSheet} from 'react-native';
import colors from 'assets/styles/color';

export default StyleSheet.create({
  button: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandColor,
    borderRadius: 16,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
});
