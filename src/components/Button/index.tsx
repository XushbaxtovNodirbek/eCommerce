import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import styles from './styles';

interface ButtonTypes extends TouchableOpacityProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  textStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
}

const Button = (props: ButtonTypes) => {
  const _renderInnerText = () => {
    if (props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="small"
          style={styles.spinner}
          color={'white'}
        />
      );
    }
    if (
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    ) {
      return (
        <Text style={[styles.textStyle, props.textStyle]}>
          {props.children}
        </Text>
      );
    }
    return props.children;
  };

  if (props.isDisabled === true || props.isLoading === true) {
    return (
      <View
        style={[
          styles.button,
          props.style,
          props.disabledStyle || styles.opacity,
        ]}>
        {_renderInnerText()}
      </View>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, props.style]}
      activeOpacity={0.7}>
      {_renderInnerText()}
    </TouchableOpacity>
  );
};

export default Button;
