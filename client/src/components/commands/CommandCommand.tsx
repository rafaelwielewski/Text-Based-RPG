import React, { useState } from 'react';
import { Props } from 'MyModels';
import { ArrowRight } from '../../assets/svg/ArrowRight';
import { getCommandList } from '../../services/command.service';

export function CommandCommand(props: Props) {
  const command: string = props.props?.command || '';

  const isValidCommand = () => {
    const commandMap = getCommandList();
    const inputCommand = command.split(' ');
    return commandMap.includes(inputCommand[0]);
  };
  return (
    <div className="flex items-center my-2">
      <span className="mr-2 text-white">
        <ArrowRight />
      </span>
      <div
        className={`bg-transparent outline-none w-full
            ${isValidCommand() ? 'text-green-500' : 'text-red-500'}`}
      >
        {command}
      </div>
    </div>
  );
}
