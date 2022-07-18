import { VStack, Heading } from 'native-base';

// import { Container } from './styles';

export function SignIn(): JSX.Element {
  return (
    <VStack flex={1} alignItems="center" bg="gray.600">
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        {' '}
        SignIn
      </Heading>
    </VStack>
  );
}
