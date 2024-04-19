import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../utils/types';

interface AuthState {
  loggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedIn, setUser } = authSlice.actions;

export default authSlice.reducer;