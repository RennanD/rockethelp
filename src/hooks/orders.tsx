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

type StatusProps = 'open' | 'started' | 'closed';

type OrdersContextData = {
  orders: Order[];
  isFetchingOrders: boolean;
  startedOrder: string;
  selectedStatus: StatusProps;
  selectStatus: (status: StatusProps) => void;
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

  const { user } = useAuth();

  function handleSelectStatus(status: StatusProps) {
    setSelectedStatus(status);
  }

  useEffect(() => {
    AsyncStorage.getItem('@rockethelp:startedOrder').then(response => {
      if (user.accountType === 'user') {
        setSelectedStatus('open');
        return;
      }

      setSelectedStatus(
        user.accountType === 'worker' && response ? 'started' : 'open',
      );
    });
  }, [user.accountType]);

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
        selectStatus: handleSelectStatus,
        startedOrder,
        selectedStatus,
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
