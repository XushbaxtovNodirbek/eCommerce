import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};
const Switch = ({value, onValueChange}: SwitchProps) => {
  const [isEnabled, setIsEnabled] = React.useState(value);
  const right = useSharedValue(0);
  const bg = useSharedValue('rgba(255,255,255,0.1)');

  React.useEffect(() => {
    right.value = withTiming(isEnabled ? -26 : 0);
  }, [isEnabled]);

  const animatedCircle = useAnimatedStyle(() => {
    return {
      right: right.value,
    };
  }, [right.value]);
  useEffect(() => {
    bg.value = withTiming(!isEnabled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,255,0.3)');
  }, [isEnabled, bg.value, bg]);

  const animatedBg = useAnimatedStyle(() => {
    return {
      backgroundColor: bg.value,
    };
  }, [bg.value]);

  return (
    <Pressable
      onPress={() => {
        setIsEnabled(!isEnabled);
        onValueChange(!isEnabled);
      }}>
      <Animated.View style={[styles.container, animatedBg]}>
        <Animated.View style={[styles.sircle, animatedCircle]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 34,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 1,
  },
  sircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});
export default Switch;
