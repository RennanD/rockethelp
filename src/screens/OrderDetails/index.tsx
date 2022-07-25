import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';

import {
  CircleWavyCheck,
  Clipboard,
  DesktopTower,
  Hourglass,
  Wrench,
} from 'phosphor-react-native';
import { Alert } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Header } from '../../components/Header';
import { OrderFirestoreDTO } from '../../dtos/order.dto';
import { formatDate } from '../../utils/formatDate';
import { Loading } from '../../components/Loading';
import { CardDetails } from '../../components/CardDetails';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { OrderData, useOrders } from '../../hooks/orders';
import { useAuth } from '../../hooks/auth';

type RouteParams = {
  orderId: string;
};

export function OrderDetails(): JSX.Element {
  const [order, setOrder] = useState<OrderData>({} as OrderData);
  const [loading, setLoading] = useState(true);
  const [userSolution, setUserSolution] = useState('');

  const { closeOrder, isClosingOrder, startOrder, isStartingOrder } =
    useOrders();

  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const { orderId } = route.params as RouteParams;

  const statusType = {
    closed: {
      message: 'finalizda',
      Icon: <CircleWavyCheck size={22} color={colors.green['300']} />,
      color: colors.green['300'],
    },
    started: {
      message: 'em andamento',
      Icon: <Wrench size={22} color={colors.primary['700']} />,
      color: colors.primary['700'],
    },
    open: {
      message: 'em aberto',
      Icon: <Hourglass size={22} color={colors.secondary['700']} />,
      color: colors.secondary['700'],
    },
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '75%'], []);

  // callbacks
  const handleConfirmSolution = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  async function handleStartOrder() {
    try {
      await startOrder(orderId);
      Alert.alert('Sucesso', 'Solicitação iniciada com sucesso');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  async function handleCloseOrder() {
    if (!userSolution) {
      Alert.alert('Erro', 'Informe a solução para encerrar');
      return;
    }

    try {
      await closeOrder(orderId, userSolution);
      Alert.alert('Sucesso', 'Solicitação finalizada com sucesso');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

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
      <Box bg="gray.600" px={6}>
        <Header title="Detalhes da Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {statusType[order.status].Icon}

        <Text
          fontSize="sm"
          color={statusType[order.status].color}
          textTransform="uppercase"
          ml={2}
        >
          {statusType[order.status].message}
        </Text>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <CardDetails
          title="Equipamento"
          description={`Patrimônio: ${order.patrimony}`}
          icon={DesktopTower}
          mt={5}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
          footer={`Registrado: ${order.when}`}
          mt={5}
        />

        {!!order.solution && (
          <CardDetails
            title="solução do problema"
            description={order.solution}
            icon={CircleWavyCheck}
            footer={`Encerrado em ${order.closed}`}
            mt={5}
          />
        )}
      </ScrollView>

      {!order.closed && user.accountType === 'worker' && (
        <Box bg="gray.600" px={4} pb={4}>
          {order.status === 'started' ? (
            <Button onPress={() => handleConfirmSolution()} mt={4}>
              Finalizar Solicitação
            </Button>
          ) : (
            <Button
              variant="secondary"
              isLoading={isStartingOrder}
              onPress={() => handleStartOrder()}
              mt={4}
            >
              Iniciar Solicitação
            </Button>
          )}
        </Box>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        enablePanDownToClose
        snapPoints={snapPoints}
        handleStyle={{
          backgroundColor: colors.gray['600'],
        }}
        style={{
          backgroundColor: colors.gray['600'],
        }}
      >
        <CardDetails
          title="solução do problema"
          description={order.solution}
          icon={CircleWavyCheck}
          h="full"
        >
          <TextInput
            placeholder="Descrição da solução"
            onChangeText={setUserSolution}
            multiline
            flex={1}
            textAlignVertical="top"
          />

          <Button
            isLoading={isClosingOrder}
            onPress={() => handleCloseOrder()}
            mt={4}
            mb={4}
          >
            Confirmar
          </Button>
        </CardDetails>
      </BottomSheetModal>
    </VStack>
  );
}
