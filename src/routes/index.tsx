import { NavigationContainer } from '@react-navigation/native';

import { VStack } from 'native-base';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import { Loading } from '../components/Loading';

import { useAuth } from '../hooks/auth';

export function Routes(): JSX.Element {
  const { isFetchingUser, user } = useAuth();

  if (isFetchingUser) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </VStack>
  );
}
