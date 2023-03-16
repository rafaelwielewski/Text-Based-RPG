import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from 'MyModels';
import { RootState } from '../../store/store';

const initialState = {} as Player;

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder;
  }
});

export const { setPlayer } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
