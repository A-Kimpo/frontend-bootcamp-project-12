import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => builder
    .addCase(channelsActions.removeChannel, (state, { payload: id }) => {
      const updatedMessages = Object.values(state.entities)
        .filter(({ channelId }) => id !== channelId);
      messagesAdapter.setMany(state, updatedMessages);
    }),
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
