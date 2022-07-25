import { useNavigation } from '@react-navigation/native';
import {
  Heading,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import { User, Wrench } from 'phosphor-react-native';
import { useState } from 'react';

import Logo from '../../assets/logo_primary.svg';
import { Button } from '../../components/Button';

export function SelectAccount(): JSX.Element {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [selectedAccountType, setSelectedAccountType] = useState('');

  function handleSelectAccoutnType(accountType: string) {
    setSelectedAccountType(accountType);
  }

  function handleNavigateToSignIn() {
    navigation.navigate('SignIn', { accountType: selectedAccountType });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={8}>
        {' '}
        Selecione o tipo de conta
      </Heading>

      <HStack w="full" alignItems="center" space={4} mb={8}>
        <Pressable flex={1} onPress={() => handleSelectAccoutnType('user')}>
          <VStack
            bg="gray.600"
            py={6}
            h={180}
            alignItems="center"
            justifyContent="center"
            rounded="sm"
            borderWidth={1}
            borderColor={
              selectedAccountType === 'user' ? 'secondary.700' : 'gray.600'
            }
          >
            <User size={32} color={colors.secondary['700']} />
            <Text color="gray.100" mt={4} textAlign="center" fontSize="md">
              Usuário{'\n'}comum
            </Text>
          </VStack>
        </Pressable>

        <Pressable flex={1} onPress={() => handleSelectAccoutnType('worker')}>
          <VStack
            bg="gray.600"
            rounded="sm"
            borderWidth={1}
            borderColor={
              selectedAccountType === 'worker' ? 'secondary.700' : 'gray.600'
            }
            px={6}
            h={180}
            alignItems="center"
            justifyContent="center"
          >
            <Wrench size={32} color={colors.secondary['700']} />
            <Text color="gray.100" mt={4} textAlign="center" fontSize="md">
              Prestador de Serviço
            </Text>
          </VStack>
        </Pressable>
      </HStack>

      <Button
        onPress={() => handleNavigateToSignIn()}
        disabled={!selectedAccountType}
        w="full"
      >
        Continuar
      </Button>
    </VStack>
  );
}
