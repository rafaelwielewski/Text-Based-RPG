import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'MyModels';
import { RootState } from '../../store/store';

const initialState = {} as Location;

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder;
  }
});

export const { setLocation } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
