
import createSagaMiddelware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/reducer'
import settings from './settings/reducer'
import authSagas from './auth/saga'
const saga = createSagaMiddelware()
export const store = configureStore({
  reducer: {
    auth,
    settings,
  },
  middleware: [saga]
})
saga.run(authSagas)

export default store;