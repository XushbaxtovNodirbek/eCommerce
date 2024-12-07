import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from 'assets/icons/SvgProp.ts';

function SvgComponent({size, ...props}: SvgProp) {
  return (
    <Svg height={size || 20} width={size || 20} viewBox="0 0 16 16" {...props}>
      <Path
        d="M8 1a3 3 0 10.002 6.002A3 3 0 008 1zM6.5 8A4.491 4.491 0 002 12.5v.5c0 1.11.89 2 2 2h6v-1H7v-4h3V8.027A4.243 4.243 0 009.5 8zM11 8v3H8v2h3v3h2v-3h3v-2h-3V8zm0 0"
        fill="#2e3436"
      />
    </Svg>
  );
}

export default SvgComponent;
