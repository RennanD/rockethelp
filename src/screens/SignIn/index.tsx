import { useState } from 'react';

import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { VStack, Heading } from 'native-base';

import { Envelope, Key } from 'phosphor-react-native';

import auth from '@react-native-firebase/auth';

import Logo from '../../assets/logo_primary.svg';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSingIn() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setLoading(false);

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />
        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
          {' '}
          Acessar sua conta
        </Heading>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          mb={4}
          icon={Envelope}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          mb={8}
          placeholder="Senha"
          icon={Key}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button isLoading={loading} onPress={() => handleSingIn()} w="full">
          Entrar
        </Button>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
