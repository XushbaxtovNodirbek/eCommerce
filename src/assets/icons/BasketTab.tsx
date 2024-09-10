import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({size, color, ...props}: SvgProp) {
  return (
    <Svg
      viewBox="0 0 24 24"
      height={size ? size : 25}
      width={size ? size : 25}
      fill="none"
      {...props}>
      <Path
        d="M21 10l-6-6m6 6H3m18 0l-1.357 6.785A4 4 0 0115.721 20H8.279a4 4 0 01-3.922-3.215L3 10m0 0l6-6"
        stroke={color ? color : '#000'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
