import { VStack, Heading } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../../assets/logo_primary.svg';
import { TextInput } from '../../components/TextInput';

export function SignIn(): JSX.Element {
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        {' '}
        SignIn
      </Heading>

      <TextInput
        placeholder="E-mail"
        mb={4}
        icon={Envelope}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput placeholder="Senha" icon={Key} secureTextEntry />
    </VStack>
  );
}
