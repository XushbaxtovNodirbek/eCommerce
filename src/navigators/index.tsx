import {createStackNavigator} from '@react-navigation/stack';
import {Auth, Launch, Main, Statistics, Tabs} from 'screens';
import {NavigatorType} from '../types';
import Werhouse from 'screens/Tabs/Wehouse';

const Stack = createStackNavigator<NavigatorType>();
const options = {
  headerShown: false,
  gestureEnabled: true,
};
function Navigator() {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Launch" component={Launch} />
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Werhouse" component={Werhouse} />
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
}

export default Navigator;
