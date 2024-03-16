import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    fullName: '',
    isLoggedIn: false,
  },
  reducers: {

    setUser: (state, action) => {
      console.log('setUser:',action,state)
      const { token, fullName } = action.payload;
      state.token = token;
      state.fullName = fullName;
      state.isLoggedIn = true;
      Cookies.set('token', token, { expires: 10 / 24 });
      Cookies.set('fullName', fullName, { expires: 10 / 24 });
    },
    clearUser: (state) => {
      state.token = null;
      state.fullName = '';
      state.isLoggedIn = false;
      Cookies.remove('token');
      Cookies.remove('fullName');
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
