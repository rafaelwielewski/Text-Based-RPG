import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommandState, HistoryState, History } from 'MyModels';
import { RootState } from '../../store/store';

const initialState: HistoryState = {
  history: [
    {
      index: 0,
      command: 'banner',
      props: {},
      status: 'init'
    }
  ]
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<History>) => {
      if (state.history.length - 1 === action.payload.index) {
        state.history = [
          ...state.history.filter((x) => x.index !== action.payload.index),
          {
            index: action.payload.index,
            command: action.payload.command,
            props: action.payload.props,
            status: 'success'
          }
        ];
        console.log(state.history);
        // state.history[action.payload.index].command = action.payload.command;
        // state.history[action.payload.index].index = action.payload.index;
        // state.history[action.payload.index].props = action.payload.props;
        // state.history[action.payload.index].status = 'success';
      } else {
        state.history = [
          ...state.history,
          {
            index: action.payload.index,
            command: action.payload.command,
            props: action.payload.props,
            status: 'success'
          }
        ];
        console.log(state.history);
      }
    },
    extraReducers: (builder) => {
      builder;
    }
  }
});

export const { setHistory } = historySlice.actions;

export const selectHistory = (state: RootState) => state.history.history;

export default historySlice.reducer;
