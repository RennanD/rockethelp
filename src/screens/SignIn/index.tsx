import { useState } from 'react';

import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import { VStack, Heading } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../../assets/logo_primary.svg';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function handleSingIn() {
  //   console.log({ email, password });
  // }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />
        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
          {' '}
          SignIn
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

        <Button w="full">Entrar</Button>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
