import React, { useState } from 'react';
import { Props } from 'MyModels';
import { ArrowRight } from '../../assets/svg/ArrowRight';
import { getCommandList } from '../../services/command.service';

export function HelpCommand() {
  const [commandMap] = useState(getCommandList());

  return (
    <div className="text-white">
      <p className="font-semibold">Hello world, welcome!</p>

      <div className="mt-3">
        <p className="underline">Available commands</p>

        <ul className="flex flex-col">
          {commandMap.map((command) => (
            <li key={command}>{command}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
