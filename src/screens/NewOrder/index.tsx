import { VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextInput } from '../../components/TextInput';

export function NewOrder(): JSX.Element {
  const bottom = getBottomSpace();

  const [loading, setLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleCreateNewOrder() {
    if (!patrimony || !description) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Sucesso', 'Solicitação enviada com sucesso');
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível enviar a solicitação');
      });
  }

  return (
    <VStack flex={1} p={6} pb={bottom + 4} bg="gray.600">
      <Header title="Nova Solicitação" />

      <TextInput
        value={patrimony}
        onChangeText={setPatrimony}
        placeholder="Número do patrimônio"
      />

      <TextInput
        placeholder="Descrição do problema"
        multiline
        mt={5}
        flex={1}
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top"
      />

      <Button isLoading={loading} onPress={() => handleCreateNewOrder()} mt={5}>
        Cadastrar
      </Button>
    </VStack>
  );
}
