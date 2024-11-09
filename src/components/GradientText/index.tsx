import MaskedView from '@react-native-masked-view/masked-view';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
type GradientTextProps = {
  colors: string[];
  [x: string]: any;
};
const GradientText = ({colors, ...props}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
