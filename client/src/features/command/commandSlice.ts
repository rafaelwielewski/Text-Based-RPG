import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommandState, Inventory, NewCommand } from 'MyModels';
import {
  getCommandList,
  getFight,
  getInventory,
  getLocation,
  getLoot,
  postEquipment,
  postFight,
  postLocation,
  sleep
} from '../../services/command.service';
import { RootState } from '../../store/store';
import { clearDrop, setDrop } from '../data/dropSlice';
import { setLocation } from '../data/locationSlice';
import { setPlayer } from '../data/playerSlice';
import { setHistory } from '../history/historySlice';

const initialState: CommandState = {
  index: 0,
  input: '',
  status: 'init'
};

export const commandAsync = createAsyncThunk<CommandState, NewCommand>(
  'command/new',
  async ({ input, index }, thunkApi) => {
    try {
      const history = {
        index: index + 1,
        command: 'command',
        props: { command: input }
      };
      thunkApi.dispatch(setHistory(history));
      return { index: index + 1, input: input };
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const newCommandAsync = createAsyncThunk<
  CommandState,
  NewCommand,
  { state: RootState }
>('command/new', async ({ input, index }, thunkApi) => {
  const inputCommand = input.split(' ');
  const commandMap = getCommandList();
  try {
    ///////////////////// COMMAND NOT FOUND ///////////////////////////
    if (!commandMap.includes(inputCommand[0])) {
      thunkApi.dispatch(
        setHistory({
          index: index + 1,
          command: 'commandNotFound',
          props: { command: input }
        })
      );
      return { index: index + 1, input: input };
    }
    ////////////////////////// HELP /////////////////////////////////
    if (inputCommand[0] === 'help') {
      thunkApi.dispatch(
        setHistory({
          index: index + 1,
          command: inputCommand[0]
        })
      );
      return { index: index + 1, input: input };
    }
    ////////////////////////// EQUIPMENT /////////////////////////////////
    if (inputCommand[0] === 'equipment') {
      const { player } = thunkApi.getState();
      const history = {
        index: index + 1,
        command: inputCommand[0],
        props: { player: player }
      };
      thunkApi.dispatch(setHistory(history));
      return { index: index + 1, input: input };
    }
    ////////////////////////// EQUIP /////////////////////////////////
    if (inputCommand[0] === 'equip') {
      if (inputCommand[1] === null || inputCommand[1] === undefined) {
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: { message: `Use command "equip" with equipment name.` }
          })
        );
        return { index: index + 1, input: input };
      } else {
        const { player } = thunkApi.getState();
        const response = await postEquipment(
          player.id,
          inputCommand[1] + ' ' + inputCommand[2]
        );
        if (response.error) {
          thunkApi.dispatch(
            setHistory({
              index: index + 1,
              command: 'message',
              props: { message: response.error }
            })
          );
          return { index: index + 1, input: input };
        } else {
          thunkApi.dispatch(setPlayer(response));
          thunkApi.dispatch(
            setHistory({
              index: index + 1,
              command: inputCommand[0],
              props: { player: response }
            })
          );
          return { index: index + 1, input: input };
        }
      }
    }
    ////////////////////////// INVENTORY /////////////////////////////////
    if (inputCommand[0] === 'stats') {
      const { player } = thunkApi.getState();
      const history = {
        index: index + 1,
        command: inputCommand[0],
        props: { player: player }
      };
      thunkApi.dispatch(setHistory(history));
      return { index: index + 1, input: input };
    }
    ////////////////////////// INVENTORY /////////////////////////////////
    if (inputCommand[0] === 'inventory') {
      const { player } = thunkApi.getState();
      const inventory: Inventory[] = (await getInventory(player.id)) || [];
      const history = {
        index: index + 1,
        command: inputCommand[0],
        props: { inventory: inventory }
      };
      thunkApi.dispatch(setHistory(history));
      return { index: index + 1, input: input };
    }
    ////////////////////////// LOCATION /////////////////////////////////
    if (inputCommand[0] === 'location') {
      const { location } = thunkApi.getState();
      const history = {
        index: index + 1,
        command: inputCommand[0],
        props: { location: location }
      };
      thunkApi.dispatch(setHistory(history));
      return { index: index + 1, input: input };
    }
    ////////////////////////// LOOT /////////////////////////////////
    if (inputCommand[0] === 'loot') {
      const { drop } = thunkApi.getState();
      if (drop.length === undefined) {
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: { message: `There's no drops to loot.` }
          })
        );
        return { index: index + 1, input: input };
      }
      if (drop.length > 0 && inputCommand[1] === 'all') {
        const { player } = thunkApi.getState();
        await getLoot(player.id, drop);
        thunkApi.dispatch(clearDrop());
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: { message: `You looted all the drops.` }
          })
        );
        return { index: index + 1, input: input };
      } else {
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: {
              message: `Use command 'loot' followed by "all" or drop name.`
            }
          })
        );
        return { index: index + 1, input: input };
      }
    }
    ////////////////////////// CLEAR DROPS ///////////////////////////
    thunkApi.dispatch(clearDrop());
    ////////////////////////// MOVE /////////////////////////////////
    if (inputCommand[0] === 'move') {
      const { location } = thunkApi.getState();
      const { player } = thunkApi.getState();
      let locationName = '';
      switch (inputCommand[1]) {
        case 'north':
          locationName = location.north;
          break;
        case 'south':
          locationName = location.south;
          break;
        case 'west':
          locationName = location.west;
          break;
        case 'east':
          locationName = location.east;
          break;
        default:
          thunkApi.dispatch(
            setHistory({
              index: index + 1,
              command: 'message',
              props: { message: `Use command 'move' with a direction.` }
            })
          );
          return { index: index + 1, input: input };
      }
      if (locationName === 'Nothing' || locationName === null) {
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: { message: `You can't go there.` }
          })
        );
        return { index: index + 1, input: input };
      } else {
        const newLocation = await postLocation(player.id, locationName);
        thunkApi.dispatch(setLocation(newLocation));
        const history = {
          index: index + 1,
          command: inputCommand[0],
          props: { location: newLocation }
        };
        thunkApi.dispatch(setHistory(history));
        return { index: index + 1, input: input };
      }
    }
    ////////////////////////// ATTACK /////////////////////////////////
    if (inputCommand[0] === 'attack') {
      const { location } = thunkApi.getState();
      const { player } = thunkApi.getState();

      if (location.monsterName !== 'Nothing') {
        let fight = await getFight(player.id, location.monsterName);
        if (fight.monster !== null) {
          thunkApi.dispatch(
            setHistory({
              index: index + 1,
              command: 'attack',
              props: { fight: fight }
            })
          );
          do {
            await sleep(3000);
            fight = await postFight(fight);
            thunkApi.dispatch(
              setHistory({
                index: index + 1,
                command: 'attack',
                props: { fight: fight }
              })
            );
          } while (fight.player.hitpoints > 0 && fight.monster.hitpoints > 0);
          if (fight.drop) {
            thunkApi.dispatch(setDrop(fight.drop));
          }
          return { index: index + 1, input: input };
        } else {
          return { index: index + 1, input: input };
        }
      } else {
        thunkApi.dispatch(
          setHistory({
            index: index + 1,
            command: 'message',
            props: { message: `There are no enemies to attack` }
          })
        );
        return { index: index + 1, input: input };
      }
    }

    ////////////////////////// ELSE /////////////////////////////////
    else {
      return { index: index + 1, input: input };
    }
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const commandSlice = createSlice({
  name: 'command',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commandAsync.fulfilled, (state, action) => {
        state.index = action.payload.index;
        state.input = action.payload.input;
        state.status = 'success';
      })
      .addCase(commandAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

// export const { setCommand } = commandSlice.actions;

export const selectCommand = (state: RootState) => state.command;

export default commandSlice.reducer;
