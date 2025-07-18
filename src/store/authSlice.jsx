import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
