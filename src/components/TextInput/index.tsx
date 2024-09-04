import {Eye} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
  isPhone?: boolean;
  readonly?: boolean;
  width?: string | number | any | {};
  isNumber?: boolean;
  isRequired?: boolean;
};

export default ({
  value,
  setValue,
  placeholder,
  isPassword,
  rightIcon,
  isPhone,
  readonly,
  width,
  isNumber,
  isRequired,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [eyeVisible, setEyeVisible] = React.useState(true);
  const [valid, setValid] = React.useState(true);

  return (
    <View
      style={[
        {
          borderWidth: isFocused ? 2 : 1.2,
          borderColor: isFocused
            ? color.brandColor
            : valid
            ? color.gray
            : color.alizarin,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginBottom: 10,
          alignItems: 'center',
          paddingHorizontal: 8,
        },
        width && {width},
      ]}>
      {isPhone && (
        <Text style={{color: color.black, fontFamily: fonts.ManropeSemiBold}}>
          +998
        </Text>
      )}
      <TextInput
        readOnly={readonly}
        maxLength={isPhone ? 12 : 100}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          if (isRequired) {
            if (value.length === 0) {
              setValid(false);
            } else {
              setValid(true);
            }
          }
        }}
        style={{
          flex: 1,
          color: readonly ? color.gray : color.black,
          fontFamily: fonts.ManropeSemiBold,
          paddingVertical: 7,
        }}
        autoCapitalize="none"
        value={isPhone ? formatPhoneNumber(value) : value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={color.gray}
        secureTextEntry={isPassword ? eyeVisible : false}
        keyboardType={isPhone || isNumber ? 'phone-pad' : 'default'}
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

function formatPhoneNumber(input: string) {
  // Remove any non-digit characters from the input
  let cleaned = input.replace(/\D/g, '');

  // Define the pattern for formatting
  let pattern = /(\d{2})(\d{3})(\d{2})(\d{2})/;

  // Format the cleaned input according to the pattern
  let formatted = cleaned.replace(pattern, '$1 $2 $3 $4');

  return formatted;
}
