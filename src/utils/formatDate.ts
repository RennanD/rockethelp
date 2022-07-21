/* eslint-disable import/no-duplicates */
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type DateFormat = "dd/MM/yyyy 'às' HH:mm";

export function formatDate(
  timestamp: FirebaseFirestoreTypes.Timestamp,
  dateFormat: DateFormat,
) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    return format(date, dateFormat, {
      locale: ptBR,
    });
  }

  return '';
}
