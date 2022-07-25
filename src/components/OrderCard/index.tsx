import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from 'native-base';

import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from 'phosphor-react-native';

export type Order = {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed' | 'started';
};

type OrderProps = IPressableProps & {
  order: Order;
};

export function OrderCard({ order, ...rest }: OrderProps): JSX.Element {
  const { colors } = useTheme();

  const colorType = {
    open: colors.secondary['700'],
    started: colors.secondary['500'],
    closed: colors.green['300'],
  };

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorType[order.status]} />
        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            Patrimônio: {order.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray['300']} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {order.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={10} w={10} mr={5}>
          {order.status === 'closed' ? (
            <CircleWavyCheck size={20} color={colors.green['500']} />
          ) : (
            <Hourglass size={20} color={colors.secondary['700']} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}
