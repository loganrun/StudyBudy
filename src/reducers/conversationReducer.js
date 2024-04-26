// conversationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
