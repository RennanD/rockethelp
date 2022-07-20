import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { NewOrder } from '../screens/NewOrder';
import { OrderDetails } from '../screens/OrderDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(): JSX.Element {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="NewOrder" component={NewOrder} />
      <Screen name="OrderDetails" component={OrderDetails} />
    </Navigator>
  );
}
