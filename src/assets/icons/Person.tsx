import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1a11 11 0 000 22 1 1 0 000-2 9 9 0 119-9v2.857a1.857 1.857 0 01-3.714 0V7.714a1 1 0 10-2 0v.179A5.234 5.234 0 0012 6.714a5.286 5.286 0 103.465 9.245A3.847 3.847 0 0023 14.857V12A11.013 11.013 0 0012 1zm0 14.286A3.286 3.286 0 1115.286 12 3.29 3.29 0 0112 15.286z" />
    </Svg>
  );
}

export default SvgComponent;
