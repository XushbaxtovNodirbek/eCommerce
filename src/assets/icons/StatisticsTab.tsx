import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProp} from './SvgProp';

function SvgComponent({size, color, ...props}: SvgProp) {
  return (
    <Svg
      fill={color ? color : '#000'}
      height={size ? size : 25}
      width={size ? size : 25}
      viewBox="0 0 215.639 215.639"
      {...props}>
      <Path d="M118.713 101.426h86.426a7.5 7.5 0 007.5-7.5C212.639 42.135 170.504 0 118.713 0a7.5 7.5 0 00-7.5 7.5v86.426a7.5 7.5 0 007.5 7.5zm7.5-86.072c37.547 3.555 67.517 33.524 71.072 71.072h-71.072V15.354z" />
      <Path d="M101.427 118.606V35.287a7.5 7.5 0 00-7.5-7.5C42.135 27.787 0 69.922 0 121.713c0 51.791 42.135 93.926 93.927 93.926 25.087 0 48.673-9.771 66.415-27.511a7.509 7.509 0 00-.034-10.639l-58.881-58.883zm-7.5 82.033c-43.52 0-78.927-35.406-78.927-78.926 0-40.991 31.41-74.784 71.427-78.572v78.572c0 1.989.79 3.896 2.197 5.304l55.561 55.562c-14.115 11.695-31.699 18.06-50.258 18.06z" />
      <Path d="M208.139 109.256h-86.426a7.499 7.499 0 00-5.303 12.804l61.1 61.1c.07.069.142.139.214.206l.013.012a7.479 7.479 0 005.088 1.99 7.48 7.48 0 005.304-2.196c17.74-17.739 27.51-41.326 27.51-66.415a7.5 7.5 0 00-7.5-7.501zm-25.561 57.759l-42.758-42.759h60.47c-1.478 15.772-7.604 30.562-17.712 42.759z" />
    </Svg>
  );
}

export default SvgComponent;
