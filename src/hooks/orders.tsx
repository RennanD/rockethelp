/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Order } from '../components/OrderCard';
import { formatDate } from '../utils/formatDate';
import { useAuth } from './auth';
import { OrderFirestoreDTO } from '../dtos/order.dto';

type StatusProps = 'open' | 'started' | 'closed';

export type OrderData = Order & {
  description: string;
  solution: string;
  closed: string;
};

type OrdersContextData = {
  orders: Order[];
  isFetchingOrders: boolean;
  isClosingOrder: boolean;
  isStartingOrder: boolean;
  startedOrder: string;
  selectedStatus: StatusProps;
  selectStatus: (status: StatusProps) => void;
  closeOrder: (orderId: string, solution: string) => Promise<void>;
  startOrder: (orderId: string) => Promise<void>;
};

const OrdersContext = createContext({} as OrdersContextData);

type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isFetchingOrders, setIsFetchingOrders] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('' as StatusProps);
  const [startedOrder, setStartedOrder] = useState('');
  const [isClosingOrder, setIsClosingOrder] = useState(false);
  const [isStartingOrder, setIsStartingOrder] = useState(false);

  const { user } = useAuth();

  function handleSelectStatus(status: StatusProps) {
    setSelectedStatus(status);
  }

  async function handleCloseOrder(orderId: string, solution: string) {
    setIsClosingOrder(true);

    try {
      await firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .update({
          status: 'closed',
          solution,
          closedAt: firestore.FieldValue.serverTimestamp(),
        });

      setStartedOrder('');
      setIsStartingOrder(false);
      await AsyncStorage.removeItem('@rockethelp:startedOrder');
    } catch {
      setIsClosingOrder(true);
      throw new Error('Não foi possível finalizar a solicitação');
    }
  }

  async function handleStartOrder(orderId: string) {
    if (startedOrder) {
      throw new Error('Já existe uma solicitação em andamento');
    }

    try {
      await firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .update({
          status: 'started',
        });

      await AsyncStorage.setItem('@rockethelp:startedOrder', orderId);

      setStartedOrder(orderId);
      setIsStartingOrder(true);
    } catch {
      setIsStartingOrder(true);
      throw new Error('Não foi possível iniciar a solicitação');
    }
  }

  useEffect(() => {
    if (user) {
      AsyncStorage.getItem('@rockethelp:startedOrder').then(response => {
        if (user?.accountType === 'user') {
          setSelectedStatus('open');
          return;
        }

        setSelectedStatus(
          user?.accountType === 'worker' && response ? 'started' : 'open',
        );
      });
    }
  }, [startedOrder, user]);

  useEffect(() => {
    setIsFetchingOrders(true);
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
        setIsFetchingOrders(false);
      });

    return subscriber;
  }, [selectedStatus]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isFetchingOrders,
        isStartingOrder,
        selectStatus: handleSelectStatus,
        startedOrder,
        selectedStatus,
        closeOrder: handleCloseOrder,
        startOrder: handleStartOrder,
        isClosingOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextData {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }

  return context;
}
