import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload: id }) => {
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, id);
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
