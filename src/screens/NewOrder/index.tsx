import { VStack } from 'native-base';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextInput } from '../../components/TextInput';

export function NewOrder(): JSX.Element {
  const bottom = getBottomSpace();

  return (
    <VStack flex={1} p={6} pb={bottom} bg="gray.600">
      <Header title="Nova Solicitação" />

      <TextInput placeholder="Número do patrimônio" />

      <TextInput
        placeholder="Descrição do problema"
        multiline
        mt={5}
        flex={1}
        textAlignVertical="top"
      />

      <Button mt={5}>Cadastrar</Button>
    </VStack>
  );
}
