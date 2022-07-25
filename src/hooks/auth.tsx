import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type SignInData = {
  email: string;
  password: string;
  accountType: string;
};

type UserData = FirebaseAuthTypes.User & {
  accountType: 'user' | 'worker';
};

type AuthContextData = {
  user: UserData;
  isLogging: boolean;
  isFetchingUser: boolean;
  singIn: (data: SignInData) => void;
  singOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  function handleSignIn({ email, password, accountType }: SignInData) {
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        setUser({
          ...response.user,
          accountType: accountType as 'user' | 'worker',
        });

        await AsyncStorage.setItem('@rockethelp:accountType', accountType);
      })
      .catch(error => {
        setIsLogging(false);

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Erro', 'Digite um e-mail válido');
          return;
        }

        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          Alert.alert('Erro', 'Credenciais inválidas');
          return;
        }

        Alert.alert('Erro', 'Não foi possível realizar o login');
      });
  }

  function handleSignOut() {
    Alert.alert('Sair', 'Deseja realmente sair da aplicação?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Sair do App',
        onPress: () => {
          auth()
            .signOut()
            .then(async () => {
              await AsyncStorage.removeItem('@rockethelp:accountType');
              setUser(null);
            })
            .catch(() => {
              Alert.alert('Erro', 'Não foi possível sair da aplicação');
            });
        },
      },
    ]);
  }

  useEffect(() => {
    setIsFetchingUser(true);
    setIsLogging(false);

    const subscriber = auth().onAuthStateChanged(async response => {
      const storagedAccountType = await AsyncStorage.getItem(
        '@rockethelp:accountType',
      );

      if (storagedAccountType) {
        const accountType = storagedAccountType as 'user' | 'worker';

        setUser({ ...response, accountType });
      }
      setIsFetchingUser(false);
    });

    return subscriber;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLogging,
        isFetchingUser,
        user,
        singIn: handleSignIn,
        singOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
