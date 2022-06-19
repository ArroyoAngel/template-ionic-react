import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';

interface authState {
  loading: boolean;
  id: string;
  session: Date;
  error: string;
}
const initialState: authState = {
  loading: false,
  id: 'id_test',
  session: new Date(),
  error: '',
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginUser: (state: authState, action: PayloadAction<{ email: string, password: string, history: History }>) => {
      state.loading = true
    },
    authSuccess: (state: authState, action: PayloadAction<{ id: string, session: Date }>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.session = action.payload.session;
    },
    authError: (state: authState, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
})

export const { loginUser, authSuccess, authError } = authReducer.actions;

export default authReducer.reducer;