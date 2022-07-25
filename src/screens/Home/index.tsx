/* eslint-disable react/jsx-no-useless-fragment */
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { SignOut } from 'phosphor-react-native';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { Button } from '../../components/Button';
import { EmptyList } from '../../components/EmptyList';
import { Filter } from '../../components/Filter';
import { IconButton } from '../../components/IconButton';
import { OrderCard } from '../../components/OrderCard';
import { Loading } from '../../components/Loading';

import Logo from '../../assets/logo_secondary.svg';

import { useAuth } from '../../hooks/auth';
import { useOrders } from '../../hooks/orders';

export function Home(): JSX.Element {
  const top = getStatusBarHeight();
  const bottom = getBottomSpace();

  const navigation = useNavigation();
  const { singOut, user } = useAuth();
  const {
    orders,
    isFetchingOrders,
    selectStatus,
    selectedStatus,
    startedOrder,
  } = useOrders();

  function handleNewOrder() {
    navigation.navigate('NewOrder');
  }

  function handleShowOrderDetails(orderId: string) {
    navigation.navigate('OrderDetails', { orderId });
  }

  function handleSignOut() {
    singOut();
  }

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
          {user.accountType === 'worker' ? (
            <>
              {startedOrder ? (
                <Filter
                  isActive={selectedStatus === 'started'}
                  type="started"
                  onPress={() => selectStatus('started')}
                >
                  Em andamento
                </Filter>
              ) : (
                <Filter
                  isActive={selectedStatus === 'open'}
                  type="open"
                  onPress={() => selectStatus('open')}
                >
                  Em Aberto
                </Filter>
              )}
            </>
          ) : (
            <Filter
              isActive={selectedStatus === 'open'}
              type="open"
              onPress={() => selectStatus('open')}
            >
              Em Aberto
            </Filter>
          )}

          <Filter
            isActive={selectedStatus === 'closed'}
            type="closed"
            onPress={() => selectStatus('closed')}
          >
            Finalizdas
          </Filter>
        </HStack>

        {isFetchingOrders ? (
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

        {user.accountType === 'user' && (
          <Button onPress={() => handleNewOrder()}>Nova Solicitação</Button>
        )}
      </VStack>
    </VStack>
  );
}
