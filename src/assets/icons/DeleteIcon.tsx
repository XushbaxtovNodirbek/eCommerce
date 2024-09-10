import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({size, color, ...props}: SvgProp) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
      <G
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 01-3 3H9a3 3 0 01-3-3V7zM9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
