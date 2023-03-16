import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import commandReducer from '../features/command/commandSlice';
import historyReducer from '../features/history/historySlice';
import playerReducer from '../features/data/playerSlice';
import locationReducer from '../features/data/locationSlice';
import dropReducer from '../features/data/dropSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    command: commandReducer,
    history: historyReducer,
    player: playerReducer,
    location: locationReducer,
    drop: dropReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
