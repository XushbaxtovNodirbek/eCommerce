import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent(props: SvgProp) {
  return (
    <Svg
      height={props.size}
      width={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M11 6a5 5 0 015 5m.659 5.655L21 21m-2-10a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke="#7a7a7a"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
