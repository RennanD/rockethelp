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

  const initialOrders: Order[] = [];

  const [orders, setOrders] = useState<Order[]>(initialOrders);

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
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">3</Text>
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
          renderItem={({ item: order }) => <OrderCard order={order} />}
        />

        <Button>Nova Solicitação</Button>
      </VStack>
    </VStack>
  );
}
