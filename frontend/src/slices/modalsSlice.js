/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  id: null,
  isOpened: false,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: { type, id = null } }) => {
      state.type = type;
      state.id = id;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.id = null;
      state.isOpened = false;
    },
  },
});

export const { actions } = modalsSlice;
export const selectors = {
  getModalType: ({ modal }) => modal.type,
  getModalId: ({ modal }) => modal.id,
  isOpened: ({ modal }) => modal.isOpened,
};
export default modalsSlice.reducer;
