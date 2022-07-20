import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

// import { Container } from './styles';

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
