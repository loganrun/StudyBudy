import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lectures: null,
  isLoading: true,
};

const lecturesSlice = createSlice({
  name: 'lectures',
  initialState,
  reducers: {
    setLectures: (state, action) => {
      state.lectures = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLectures } = lecturesSlice.actions;
export default lecturesSlice.reducer;
