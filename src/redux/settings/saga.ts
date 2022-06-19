import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { setAvailable } from './reducer'
async function setAvailableAsync() {
  return {
    id: 'arroyoalangel',
    session: new Date()
  }
}
function* setAvailableFunction(): any {
  const result = yield call(setAvailableAsync);
  yield put(setAvailable(result))
}
export function* watchSetAvailable() {
  yield takeEvery('auth/loginUser', setAvailableFunction);
}

export default function* rootSaga() {
  yield all([
      fork(watchSetAvailable)
  ]);
}