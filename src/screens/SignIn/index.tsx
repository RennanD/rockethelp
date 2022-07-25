import { useRef, useState } from 'react';

import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { VStack, Heading } from 'native-base';

import { Envelope, Key } from 'phosphor-react-native';

import { useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import Logo from '../../assets/logo_primary.svg';

import { useAuth } from '../../hooks/auth';

type RouteParams = {
  accountType: string;
};

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef(null);

  const { isLogging, singIn } = useAuth();
  const route = useRoute();

  const { accountType } = route.params as RouteParams;

  function handleSingIn() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    singIn({ email, password, accountType });
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
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />
        <TextInput
          ref={passwordInputRef}
          mb={8}
          placeholder="Senha"
          icon={Key}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={() => handleSingIn()}
        />

        <Button isLoading={isLogging} onPress={() => handleSingIn()} w="full">
          Entrar
        </Button>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
