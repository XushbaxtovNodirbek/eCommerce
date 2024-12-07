import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Defs>
        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <Stop stopColor="#1DD47F" offset="0%" />
          <Stop stopColor="#0DA949" offset="100%" />
        </LinearGradient>
      </Defs>
      <Path
        d="M714.443 40.627c.743.795.743 2.06 0 2.855l-16.696 17.891a1.944 1.944 0 01-1.65.614 1.944 1.944 0 01-1.496-.624l-9.044-9.692a2.108 2.108 0 010-2.855 1.938 1.938 0 012.854 0l7.768 8.324 15.41-16.513a1.938 1.938 0 012.854 0z"
        transform="translate(-735 -1911) translate(50 1871)"
        fill="url(#a)"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
}

export default SvgComponent;
