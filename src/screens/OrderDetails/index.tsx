import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { HStack, ScrollView, Text, useTheme, VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';

import {
  CircleWavyCheck,
  Clipboard,
  DesktopTower,
  Hourglass,
} from 'phosphor-react-native';
import { Header } from '../../components/Header';
import { Order } from '../../components/OrderCard';
import { OrderFirestoreDTO } from '../../dtos/order.dto';
import { formatDate } from '../../utils/formatDate';
import { Loading } from '../../components/Loading';
import { CardDetails } from '../../components/CardDetails';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

type RouteParams = {
  orderId: string;
};

type OrderData = Order & {
  description: string;
  solution: string;
  closed: string;
};

export function OrderDetails(): JSX.Element {
  const [order, setOrder] = useState<OrderData>({} as OrderData);
  const [loading, setLoading] = useState(true);
  const [userSolution, setUserSolution] = useState('');

  const { colors } = useTheme();

  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          createdAt,
          patrimony,
          status,
          solution,
          description,
          closedAt,
        } = doc.data();

        setOrder({
          id: doc.id,
          patrimony,
          status,
          when: formatDate(createdAt, "dd/MM/yyyy 'às' HH:mm"),
          closed: formatDate(closedAt, "dd/MM/yyyy 'às' HH:mm"),
          description,
          solution,
        });

        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Detalhes da Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green['300']} />
        ) : (
          <Hourglass size={22} color={colors.secondary['700']} />
        )}

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? 'green.300' : 'secondary.700'}
          textTransform="uppercase"
          ml={2}
        >
          {order.status === 'closed' ? 'Finalizdo' : 'Em aberto'}
        </Text>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        {!!order.solution && (
          <CardDetails
            title="solução do problema"
            description={order.solution}
            icon={CircleWavyCheck}
            footer={`Encerrado em ${order.closed}`}
          />
        )}

        {order.status === 'open' && (
          <CardDetails
            title="solução do problema"
            description={order.solution}
            icon={CircleWavyCheck}
          >
            <TextInput
              placeholder="Descrição da solução"
              onChangeText={setUserSolution}
              multiline
              h={24}
              textAlignVertical="top"
            />

            <Button mt={4}>Finalizar</Button>
          </CardDetails>
        )}
      </ScrollView>
    </VStack>
  );
}
