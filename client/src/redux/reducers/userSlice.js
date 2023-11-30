import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;