import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Drop } from 'MyModels';
import { RootState } from '../../store/store';

const initialState = {} as Drop[];

export const dropSlice = createSlice({
  name: 'drop',
  initialState,
  reducers: {
    setDrop: (state, action: PayloadAction<Drop[]>) => {
      return action.payload;
    },
    clearDrop: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder;
  }
});

export const { setDrop, clearDrop } = dropSlice.actions;

export const selectDrop = (state: RootState) => state.drop;

export default dropSlice.reducer;
