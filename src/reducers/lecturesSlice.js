import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lectures: null,
  isLoading: true,
  subject: null,
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
    },
    deleteLecture: (state, action) => {
      state.lectures = state.lectures.filter(lecture => lecture._id !== action.payload);
    },
    addSubject: (state, action) => {
      state.subject = action.payload;
    },
  },
});

export const { setLectures, updateLectures, deleteLecture, addSubject } = lecturesSlice.actions;
export default lecturesSlice.reducer;
