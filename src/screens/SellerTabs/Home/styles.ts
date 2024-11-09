import {StyleSheet} from 'react-native';
import fonts from 'assets/styles/fonts.ts';
import color from 'assets/styles/color.ts';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  selectedTextStyle: {
    color: color.textColor,
    fontSize: 16,
  },
  item: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: color.gray,
  },
  dropdown: {
    maxHeight: 150,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'white',
    top: 0,
  },
  title: {
    fontFamily: fonts.ManropeSemiBold,
    fontSize: 18,
    color: color.textColor,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  listCon: {
    flex: 3,
    width: '100%',
    backgroundColor: color.lgray,
  },
  controls: {
    flex: 2,
    width: '100%',
    backgroundColor: color.white,
  },
  clear: {
    color: 'red',
    fontSize: 16,
    fontFamily: fonts.ManropeSemiBold,
  },
  text: {
    fontSize: 30,
    fontFamily: fonts.ManropeBold,
  },
});
