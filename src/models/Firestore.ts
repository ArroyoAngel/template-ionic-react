import { Timestamp } from "firebase/firestore";

export interface accounts {
  available: boolean,
  created: Date|Timestamp,
  email: string,
  id: string,
}