import { VStack } from 'native-base';
import { Header } from '../../components/Header';

export function OrderDetails(): JSX.Element {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Detalhes da Solicitação" />
    </VStack>
  );
}
