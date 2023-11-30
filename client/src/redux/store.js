import { configureStore } from '@reduxjs/toolkit';
import pastriesReducer from './reducers/pastrySlice';


export const store = configureStore({
    reducer: {
        pastries: pastriesReducer,
    }
});