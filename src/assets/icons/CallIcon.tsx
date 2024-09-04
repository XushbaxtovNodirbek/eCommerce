import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent(props: SvgProp) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M9 16C2.814 9.813 3.11 5.134 5.94 3.012l.627-.467a1.483 1.483 0 012.1.353l1.579 2.272a1.5 1.5 0 01-.25 1.99l-1.52 1.314c-.38.329-.566.828-.395 1.301.316.88 1.083 2.433 2.897 4.246 1.814 1.814 3.366 2.581 4.246 2.898.474.17.973-.015 1.302-.396l1.314-1.518a1.5 1.5 0 011.99-.25l2.276 1.58a1.48 1.48 0 01.354 2.096l-.47.633C19.869 21.892 15.188 22.187 9 16z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
