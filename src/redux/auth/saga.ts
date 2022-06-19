import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { authError, authSuccess } from './reducer'
import {  PayloadAction } from '@reduxjs/toolkit';

import { History } from 'history';
import { getDocuments, getData, loginEmailPassword } from '../../models/Firebase'
import { FirebaseErrors } from '../../constants/Firebase'
import { UserCredential } from 'firebase/auth';

/* LOGIN USER */
async function loginUserAsync(email: string, password: string) {
  /*const collection = await getDocuments('orders', ['state', '==', 'pending'])
  const result = await getData(collection)
  console.log(result)*/
  const response = await loginEmailPassword(email, password).catch( error => {
    return { error: FirebaseErrors[error.code] }
  })
  return response
}
function* loginUser({ payload }: PayloadAction<{ email: string, password: string, history: History }>): any {
  const { email, password, history } = payload
  const result = yield call(loginUserAsync, email, password);
  if(!result.error){
    yield put(authSuccess(result))
  }else{
    yield put(authError(result))
  }
  history.push('/app/users/list')
}
export function* watchLoginUser() {
  yield takeEvery('auth/loginUser', loginUser);
}

/* EXPORTS SAGAS */
export default function* rootSaga() {
  yield all([
      fork(watchLoginUser)
  ]);
}