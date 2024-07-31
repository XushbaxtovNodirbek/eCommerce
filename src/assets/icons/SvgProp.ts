import {SvgProps} from 'react-native-svg';

export type SvgProp = SvgProps & {
  visible?: boolean;
  size?: number;
  color?: string;
};
