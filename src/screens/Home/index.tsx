import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import Logo from '../../assets/logo_secondary.svg';
import { Button } from '../../components/Button';
import { EmptyList } from '../../components/EmptyList';
import { Filter } from '../../components/Filter';
import { IconButton } from '../../components/IconButton';
import { Order, OrderCard } from '../../components/OrderCard';

export function Home(): JSX.Element {
  const top = getStatusBarHeight();
  const bottom = getBottomSpace();

  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed'>(
    'open',
  );

  const navigation = useNavigation();

  const initialOrders: Order[] = [
    {
      id: '123',
      patrimony: '12354687',
      when: '18/07/2022 as 10:00',
      status: 'open',
    },
    {
      id: '1234',
      patrimony: '12354687',
      when: '18/07/2022 as 10:00',
      status: 'open',
    },
    {
      id: '1235',
      patrimony: '12354687',
      when: '18/07/2022 as 10:00',
      status: 'open',
    },
    {
      id: '1236',
      patrimony: '12354687',
      when: '18/07/2022 as 10:00',
      status: 'open',
    },
  ];

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  function handleNewOrder() {
    navigation.navigate('NewOrder');
  }

  function handleShowOrderDetails(orderId: string) {
    navigation.navigate('OrderDetails', { orderId });
  }

  return (
    <VStack flex={1} bg="gray.700" pb={bottom}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12 + top}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={SignOut} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            isActive={selectedStatus === 'open'}
            type="open"
            onPress={() => setSelectedStatus('open')}
          >
            Em Aberto
          </Filter>
          <Filter
            isActive={selectedStatus === 'closed'}
            type="closed"
            onPress={() => setSelectedStatus('closed')}
          >
            Finalizdos
          </Filter>
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={order => order.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<EmptyList status={selectedStatus} />}
          renderItem={({ item: order }) => (
            <OrderCard
              order={order}
              onPress={() => handleShowOrderDetails(order.id)}
            />
          )}
        />

        <Button onPress={() => handleNewOrder()}>Nova Solicitação</Button>
      </VStack>
    </VStack>
  );
}
