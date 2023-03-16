import React, { useState } from 'react';
import { ArrowRight } from '../assets/svg/ArrowRight';
import {
  commandAsync,
  newCommandAsync,
  selectCommand
} from '../features/command/commandSlice';
import { setHistory } from '../features/history/historySlice';
import { getCommandList } from '../services/command.service';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function Command() {
  const dispatch = useAppDispatch();
  const command = useAppSelector(selectCommand);
  const [input, setInput] = useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const isValidCommand = () => {
    const commandMap = getCommandList();
    const inputCommand = input.split(' ');
    return commandMap.includes(inputCommand[0]);
  };
  async function handleInputKeydown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === 'Enter') {
      setInput('');
      await dispatch(
        commandAsync({
          input: input,
          index: command.index
        })
      );
      await dispatch(
        newCommandAsync({
          input: input,
          index: command.index + 1
        })
      );
    }
  }

  return (
    <div>
      <div className="flex items-center my-2">
        <span className="mr-2 text-white">
          <ArrowRight />
        </span>
        <input
          spellCheck="false"
          type="text"
          autoFocus
          ref={inputRef}
          className={`bg-transparent outline-none w-full
            ${isValidCommand() ? 'text-green-500' : 'text-red-500'}`}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value.toLowerCase())}
          onKeyDown={handleInputKeydown}
        />
      </div>
    </div>
  );
}
