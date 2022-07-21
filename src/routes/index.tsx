import { NavigationContainer } from '@react-navigation/native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { useEffect, useState } from 'react';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';

// import { Container } from './styles';

type UserData = FirebaseAuthTypes.User;

export function Routes(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(response => {
      setUser(response);
      setLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
