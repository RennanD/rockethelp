import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type OrderFirestoreDTO = {
  id: string;
  patrimony: string;
  status: 'open' | 'closed';
  description: string;
  solution?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  closedAt?: FirebaseFirestoreTypes.Timestamp;
};
