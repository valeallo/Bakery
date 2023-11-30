import { configureStore } from '@reduxjs/toolkit';
import pastriesReducer from './reducers/pastrySlice';
import userSlice from './reducers/userSlice';

export const store = configureStore({
    reducer: {
        pastries: pastriesReducer,
        user: userSlice
    }
});