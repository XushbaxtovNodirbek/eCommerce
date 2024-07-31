import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({visible, ...props}: SvgProp) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      {visible ? (
        <>
          <Path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7z"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <Path
          d="M2.999 3l18 18M9.843 9.914a3 3 0 004.265 4.22M6.5 6.646A10.024 10.024 0 002.457 12c1.274 4.057 5.065 7 9.542 7 1.99 0 3.842-.58 5.4-1.582m-6.4-12.369c.329-.032.663-.049 1-.049 4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 01-1.189 2.5"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

export default SvgComponent;
