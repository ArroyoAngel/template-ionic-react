import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserInfo, UserMetadata } from 'firebase/auth';
import { History } from 'history';
import { accounts } from '../../models/Firestore'
interface authState {
  providerData: null|UserInfo,
  metadata: null|UserMetadata,
  session: null|{
    accessToken: string,
    expirationTime: number,
    refreshToken: string,
  },
  data: accounts|null,

  loading: boolean;
  error: string;
}
const initialState: authState = {
  providerData: null,
  metadata: null,
  session: null,
  data: null,

  loading: false,
  error: '',
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginUser: (state: authState, action: PayloadAction<{ email: string, password: string, history: History }>) => {
      state.loading = true
    },
    refreshToken: (state: authState, action: PayloadAction<{ user: any }>) => {
      const { user } = action.payload
      let localData = localStorage.getItem('user_data')
      if( localData )state.data = JSON.parse(localData)
      else state.data = user.providerData[0]
      state.providerData = user.providerData[0]
      state.session = user.stsTokenManager
      state.metadata = user.metadata
    },
    authSuccess: (state: authState, action: PayloadAction<authState|Object>) => {
      for(let key in action.payload){
        eval(`state.${key} = action.payload.${key}`)
      }
      state.loading = false;
    },
    authError: (state: authState, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
      state.loading = false;
    }
  }
})

export const { loginUser, authSuccess, refreshToken, authError } = authReducer.actions;

export default authReducer.reducer;