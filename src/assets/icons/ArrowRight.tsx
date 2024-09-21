import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({size, color, ...props}: SvgProp) {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" {...props}>
      <G id="SVGRepo_iconCarrier">
        <Path
          id="arrow-right"
          d="M1152 360a12 12 0 1112-12 12 12 0 01-12 12zm0-22a10 10 0 1010 10 10 10 0 00-10-10zm5.98 10.081v.027a1.129 1.129 0 01-.05.26c-.02.035-.04.064-.06.1a.861.861 0 01-.13.193.688.688 0 01-.11.083l-2.56 3.792a1.205 1.205 0 01-1.51.348.873.873 0 01-.41-1.3l1.74-2.583H1147a1 1 0 010-2h7.89l-1.74-2.582a.874.874 0 01.41-1.3 1.208 1.208 0 011.51.348l2.54 3.762a.154.154 0 01.04.047 1.083 1.083 0 01.22.255.839.839 0 01.11.374v.016a.043.043 0 01.01.033c0 .016.01.03.01.046s-.01.031-.01.046a.048.048 0 01-.01.035z"
          transform="translate(-1140 -336)"
          fill={color}
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
