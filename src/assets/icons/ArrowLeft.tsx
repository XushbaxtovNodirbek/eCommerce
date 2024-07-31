import * as React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: ColorValue;
}

function SvgComponent(props: Props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
        stroke={props.color}
        strokeWidth={2.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  size: 24,
  color: '#000',
};

export default SvgComponent;
