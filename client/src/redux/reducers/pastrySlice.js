
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_PASTRIES_API } from "../../constants/Constants";


const initialState = {
    pastries: [],
    status: 'idle', 
    error: null
};


export const fetchPastries = createAsyncThunk('pastries/fetchPastries', async () => {
    const response = await axios.get(FETCH_PASTRIES_API);
    return response.data;
});

export const fetchPastryById = createAsyncThunk('pastries/fetchPastryById', async (pastryId) => {
    const response = await axios.get(`${FETCH_PASTRIES_API}/${pastryId}`);
    return response.data;
});


export const createPastry = createAsyncThunk('pastries/createPastry', async (pastryData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${FETCH_PASTRIES_API}`, pastryData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updatePastry = createAsyncThunk('pastries/updatePastry', async ({ id, pastryData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${FETCH_PASTRIES_API}/${id}`, pastryData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deletePastry = createAsyncThunk('pastries/deletePastry', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${FETCH_PASTRIES_API}/${id}`);
        return id; 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
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
            })
            .addCase(fetchPastryById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPastryById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pastries.push(action.payload);
            })
            .addCase(fetchPastryById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPastry.fulfilled, (state, action) => {
                state.pastries.push(action.payload);
            })
            .addCase(updatePastry.fulfilled, (state, action) => {
                const index = state.pastries.findIndex(pastry => pastry._id === action.payload._id);
                state.pastries[index] = action.payload;
            })
            .addCase(deletePastry.fulfilled, (state, action) => {
                state.pastries = state.pastries.filter(pastry => pastry._id !== action.payload);
            });
    }
});

export const selectAllPastries = (state) => state.pastries.pastries;
export const getPastriesStatus = (state) => state.pastries.status;
export const getPastriesError = (state) => state.pastries.error;
export const selectCurrentPastry = (state, pastryId) => 
    state.pastries.pastries.find(pastry => pastry._id === pastryId);

export default pastriesSlice.reducer;