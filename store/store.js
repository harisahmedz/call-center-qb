import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSlice from './slice/userSlice'; // Assuming you will create this slice

export const makeStore = () => configureStore({
  reducer: {
    user: userSlice,
  },
});

export const wrapper = createWrapper(makeStore);
