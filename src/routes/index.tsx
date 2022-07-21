import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

// import { Container } from './styles';

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
