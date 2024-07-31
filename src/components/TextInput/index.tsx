import {Eye} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import React from 'react';
import {TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-paper';

type Props = {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
};

export default ({
  value,
  setValue,
  placeholder,
  isPassword,
  rightIcon,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [eyeVisible, setEyeVisible] = React.useState(true);

  return (
    <View
      style={{
        borderWidth: isFocused ? 2 : 1.2,
        borderColor: isFocused ? color.brandColor : color.gray,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 8,
      }}>
      <TextInput
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        style={{
          flex: 1,
          color: color.black,
          fontFamily: fonts.ManropeSemiBold,
          paddingVertical: 7,
        }}
        autoCapitalize="none"
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={color.gray}
        secureTextEntry={isPassword ? eyeVisible : false}
      />
      {isPassword ? (
        <TouchableOpacity onPress={() => setEyeVisible(!eyeVisible)}>
          <Eye visible={!eyeVisible} />
        </TouchableOpacity>
      ) : (
        rightIcon
      )}
    </View>
  );
};
