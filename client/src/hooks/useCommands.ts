import AttackCommand from "@/lib/commands/AttackCommand";
import MoveCommand from "@/lib/commands/MoveCommand";
import TestCommand from "@/lib/commands/TestCommand";
import { useData } from "@/utils/dataProvider";
import * as React from "react";
import create from "zustand";
import { Command } from "../lib/Command";
import { CommandEntry, CommandStatus } from "../lib/types";
import { commandNotFound, getCommandName, initBanner, test } from "../lib/utils";

interface CommandStore {
  commandMap: Map<string, Command>;
  setCommandMap(map: CommandStore["commandMap"]): void;

  entries: CommandEntry[];
  setEntries(entries: CommandEntry[]): void;
}

const DEFAULT_ENTRIES: CommandEntry[] = [
  { output: initBanner({ command: "" }), command: undefined, status: CommandStatus.Init },
  { output: null, command: null },
];

const useCommandsStore = create<CommandStore>((set) => ({
  commandMap: new Map(),
  setCommandMap: (map) => set({ commandMap: map }),

  entries: DEFAULT_ENTRIES,
  setEntries: (entries) => set({ entries }),
}));

export function useCommands() {
  const { user, player, location, setLocation}  = useData();
  const state = useCommandsStore();
  const commandsArr = React.useMemo(() => Array.from(state.commandMap.keys()), [state.commandMap]);

  async function handleNewCommand(args: string[], idx: number) {
    const { commandName, commandArgs, isSudo } = getCommandName(args);
    const fullCommand = isSudo ? `sudo ${commandName}` : commandName;
    const commandFunctionOptions = { command: commandName };

    if (commandName === "clear") {
      return state.setEntries([{ command: null, output: null, status: CommandStatus.Succeeded }]);
    }


    if (commandName.trim() === "") {
      return _addCommandToEntries(idx, {
        status: CommandStatus.Succeeded,
        command: undefined,
        output: null,
        args: commandArgs,
      });
    }

    if (commandName === "lol") {
      console.log('teste')
        return _addCommandToEntries(idx, {
          status: CommandStatus.Succeeded,
          command: fullCommand,
          output: 'klçklçkç',
          args: commandArgs,
        });
      }

      
    const command = state.commandMap.get(commandName);
    if (!command) {
      _addCommandToEntries(idx, {
        status: CommandStatus.Failed,
        command: fullCommand,
        output: commandNotFound(commandFunctionOptions),
        args: commandArgs,
      });

      return;
    }
    
    if (commandName === "move") {
      const response =
        await command.render({
        commands: commandsArr,
        command: commandName,
        args: args,
        user: user,
        player: player,
        location: location,
      })
      console.log(response.data)
      if (response.data) {
        setLocation(response.data)
      }
      return _addCommandToEntries(idx, {
        status: CommandStatus.Succeeded,
        command: fullCommand,
        output: response.render,
        args: commandArgs,
      });
    }

    if (commandName === "attack") {

      const attack = new AttackCommand;

      let fight = await attack.getMonster(player, location)
      const response = attack.render(fight)
      _addCommandToEntries(idx, {
        status: CommandStatus.Succeeded,
        command: fullCommand,
        output: response,
        args: commandArgs,
      });

      do{

      fight = await attack.attack(fight)
      const response = attack.render(fight)
      _addCommandToEntries(idx, {
        status: CommandStatus.Succeeded,
        command: fullCommand,
        output: response,
        args: commandArgs,
      });
    } while (fight.player.hitpoints > 0 && fight.monster.hitpoints > 0)

    // if (fight.monster.hitpoints === 0) {
    //   fight = await attack.monsterKiller(fight)
    //   const response = attack.render(fight)
    //   _addCommandToEntries(idx, {
    //     status: CommandStatus.Succeeded,
    //     command: fullCommand,
    //     output: response,
    //     args: commandArgs,
    //   });
    // }
    }

    else{

      const output = command.render({
        commands: commandsArr,
        command: commandName,
        args: args,
        user: user,
        player: player,
        location: location,
      });
  
  
      _addCommandToEntries(idx, {
        status: CommandStatus.Succeeded,
        command: fullCommand,
        output,
        args: commandArgs,
      });
    }
  }

  function _addCommandToEntries(idx: number, entry: CommandEntry) {
    const newEntries = [...state.entries];
    newEntries[idx] = entry;
    state.setEntries([...newEntries, { command: null, output: null }]);
  }

  return {
    state,
    commandsArr,
    handleNewCommand,
  };
}
