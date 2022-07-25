import { useEffect, useState } from 'react';

import { FlatList, Heading, HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { SignOut } from 'phosphor-react-native';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { Button } from '../../components/Button';
import { EmptyList } from '../../components/EmptyList';
import { Filter } from '../../components/Filter';
import { IconButton } from '../../components/IconButton';
import { Order, OrderCard } from '../../components/OrderCard';
import { Loading } from '../../components/Loading';

import Logo from '../../assets/logo_secondary.svg';

import { useAuth } from '../../hooks/auth';
import { formatDate } from '../../utils/formatDate';

export function Home(): JSX.Element {
  const top = getStatusBarHeight();
  const bottom = getBottomSpace();

  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed'>(
    'open',
  );
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { singOut } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  function handleNewOrder() {
    navigation.navigate('NewOrder');
  }

  function handleShowOrderDetails(orderId: string) {
    navigation.navigate('OrderDetails', { orderId });
  }

  function handleSignOut() {
    singOut();
  }

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', selectedStatus)
      .onSnapshot(response => {
        const data = response.docs.map(document => {
          const { patrimony, description, status, createdAt } = document.data();

          return {
            patrimony,
            description,
            status,
            when: formatDate(createdAt, "dd/MM/yyyy 'às' HH:mm"),
            id: document.id,
          };
        });

        setOrders(data);
        setLoading(false);
      });

    return subscriber;
  }, [selectedStatus]);

  return (
    <VStack flex={1} bg="gray.700" pb={bottom + 4}>
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

        <IconButton icon={SignOut} onPress={() => handleSignOut()} />
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

        {loading ? (
          <Loading />
        ) : (
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
        )}

        <Button onPress={() => handleNewOrder()}>Nova Solicitação</Button>
      </VStack>
    </VStack>
  );
}
