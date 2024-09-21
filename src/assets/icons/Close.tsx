import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({size, color, ...props}: SvgProp) {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" {...props}>
      <G id="SVGRepo_iconCarrier">
        <Path
          id="cancel"
          d="M936 120a12 12 0 1112-12 12 12 0 01-12 12zm0-22a10 10 0 1010 10 10 10 0 00-10-10zm4.706 14.706a.951.951 0 01-1.345 0l-3.376-3.376-3.376 3.376a.949.949 0 11-1.341-1.342l3.376-3.376-3.376-3.376a.949.949 0 111.341-1.342l3.376 3.376 3.376-3.376a.949.949 0 111.342 1.342l-3.376 3.376 3.376 3.376a.95.95 0 01.003 1.342z"
          transform="translate(-924 -96)"
          fillRule="evenodd"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
