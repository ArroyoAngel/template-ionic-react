import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  theme: string;
  available: boolean;
}
const initialState: authState = {
  theme: '',
  available: true,
}

export const settingsReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAvailable: (state: authState, action: PayloadAction<{ available: boolean}>) => {
      state.available = action.payload.available
    },
  }
})

export const { setAvailable } = settingsReducer.actions;

export default settingsReducer.reducer;