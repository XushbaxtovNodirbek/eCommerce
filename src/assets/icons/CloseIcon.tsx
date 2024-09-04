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
        d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"
        fill={props.color ? props.color : '#0F0F0F'}
      />
    </Svg>
  );
}

export default SvgComponent;
