import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent(props: SvgProp) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" {...props}>
      <Path d="M4 4h6v6H4V4m16 0v6h-6V4h6m-6 11h2v-2h-2v-2h2v2h2v-2h2v2h-2v2h2v3h-2v2h-2v-2h-3v2h-2v-4h3v-1m2 0v3h2v-3h-2M4 20v-6h6v6H4M6 6v2h2V6H6m10 0v2h2V6h-2M6 16v2h2v-2H6m-2-5h2v2H4v-2m5 0h4v4h-2v-2H9v-2m2-5h2v4h-2V6M2 2v4H0V2a2 2 0 012-2h4v2H2m20-2a2 2 0 012 2v4h-2V2h-4V0h4M2 18v4h4v2H2a2 2 0 01-2-2v-4h2m20 4v-4h2v4a2 2 0 01-2 2h-4v-2z" />
    </Svg>
  );
}

export default SvgComponent;
