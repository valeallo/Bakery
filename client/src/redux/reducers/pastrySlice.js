
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PASTRIES_URL = 'your-api-endpoint';

const initialState = {
    pastries: [],
    status: 'idle', 
    error: null
};


export const fetchPastries = createAsyncThunk('pastries/fetchPastries', async () => {
    const response = await axios.get(PASTRIES_URL);
    return response.data;
});


const pastriesSlice = createSlice({
    name: 'pastries',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPastries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPastries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pastries = action.payload;
            })
            .addCase(fetchPastries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllPastries = (state) => state.pastries.pastries;
export const getPastriesStatus = (state) => state.pastries.status;
export const getPastriesError = (state) => state.pastries.error;

export default pastriesSlice.reducer;