import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NativeBaseProvider, StatusBar } from 'native-base';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import { OrdersProvider } from './src/hooks/orders';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvider>
            <OrdersProvider>
              {fontsLoaded ? <Routes /> : <Loading />}
            </OrdersProvider>
          </AuthProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
