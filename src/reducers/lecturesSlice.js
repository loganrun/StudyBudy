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
    updateLectures: (state, action) => {
      state.lectures = [...state.lectures, action.payload];
    }
  },
});

export const { setLectures, updateLectures } = lecturesSlice.actions;
export default lecturesSlice.reducer;
