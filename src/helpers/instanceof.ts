import { UserCredential } from 'firebase/auth';
import { Error } from '../constants/Firebase';

export const isUserCredential = (data: any): data is UserCredential => data;
export const isError = (data: any): data is Error => data;