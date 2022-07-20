import { Center, Text, useTheme } from 'native-base';
import { ChatTeardropText } from 'phosphor-react-native';

type EmptyListProps = {
  status: 'open' | 'closed';
};

export function EmptyList({ status }: EmptyListProps): JSX.Element {
  const { colors } = useTheme();

  const messageStatus = {
    open: 'em aberto',
    closed: 'finalizadas',
  };

  return (
    <Center>
      <ChatTeardropText color={colors.gray['300']} size={40} />
      <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
        Você não possui solicitações{'\n'} {messageStatus[status]}
      </Text>
    </Center>
  );
}
