import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { authError, authSuccess } from './reducer'
import {  PayloadAction } from '@reduxjs/toolkit';

import { History } from 'history';
import Firebase from '../../models/Firebase'
import { FirebaseErrors } from '../../constants/Firebase'
import { UserCredential } from 'firebase/auth';
import { isUserCredential } from '../../helpers/instanceof'
import { DocumentData, Query } from 'firebase/firestore';
import { Account } from '../../models/Account';


/* GET ACCOUNT */
async function getAccountAsync(email: string): Promise<any> {
  const response: Query<DocumentData> = await Firebase.getDocuments('accounts', ['email', '==', email])
  const data = await Firebase.getData(response)
  return data[0]
}

function* getAccountGenerator({ payload }: PayloadAction<{ email: string }>): any {
  const { email } = payload
  const result = yield call(getAccountAsync, email);
  console.log("asdasdasdasassad")
  if(!result.error){
    yield put(authSuccess(result))
  }else{
    yield put(authError(result))
  }
}
export function* watchGetAccount() {
  yield takeEvery('auth/getAccount', getAccountGenerator);
}

/* LOGIN USER */
async function loginUserAsync(email: string, password: string): Promise< UserCredential|unknown> {

  const account = await Firebase.loginEmailPassword(email, password).catch( error => {
    const firebaseResponse: string|unknown = FirebaseErrors[error.code]
    if(firebaseResponse)return { error: firebaseResponse }
    else return { error: 'Error no conocido, contacte al administrador.' }
  })
  const { user }: any = account
  if(isUserCredential(account) && account.user.email){
    const data = await getAccountAsync(account.user.email)
    const modelData: Account = new Account(user.providerData[0], user.metadata, user.stsTokenManager, data)

    if(data.available)return modelData
    else return { error: 'Esta cuenta esta deshabilitada' }
  }
}

function* loginUser({ payload }: PayloadAction<{ email: string, password: string, history: History }>): any {
  const { email, password, history } = payload
  const result: any = yield call(loginUserAsync, email, password);
  if(!result.error){
    result.signInPersistence()

    yield put(authSuccess(result))
    history.push('/app/users')
  }else{
    yield put(authError(result))
  }
}
export function* watchLoginUser() {
  yield takeEvery('auth/loginUser', loginUser);
}

/* EXPORTS SAGAS */
export default function* rootSaga() {
  yield all([
      fork(watchLoginUser),
      fork(watchGetAccount)
  ]);
}