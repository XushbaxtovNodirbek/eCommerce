import {Eye} from 'assets/icons';
import color from 'assets/styles/color';
import fonts from 'assets/styles/fonts';
import globalStyles from 'assets/styles/globalStyles';
import numberWithSpaces from 'helpers/numberWithSpaces';
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
  isTextArea?: boolean;
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
  isTextArea,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [eyeVisible, setEyeVisible] = React.useState(true);
  const [valid, setValid] = React.useState(true);

  return (
    <View style={[{width: '90%'}, width && {width}]}>
      <Text style={globalStyles.label}>
        {(isFocused || value) && placeholder}
      </Text>
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
            // marginBottom: 10,
            paddingHorizontal: 8,
            alignItems: isTextArea ? 'flex-start' : 'center',
          },
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
            fontSize: 16,
            textAlignVertical: 'top',
            height: isTextArea ? 80 : 'auto',
          }}
          autoCapitalize="none"
          multiline={isTextArea}
          numberOfLines={isTextArea ? 3 : 1}
          value={
            isPhone
              ? formatPhoneNumber(value)
              : isNumber
              ? numWithSpec(value.replaceAll(' ', ''))
              : value
          }
          onChangeText={text => setValue(text)}
          placeholder={isFocused ? '' : placeholder}
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

function numWithSpec(num: string) {
  if (num === '') return ''; // return empty string if input is empty
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // format number with spaces
}
