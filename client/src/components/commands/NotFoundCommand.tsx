import React from 'react';
import { Props } from 'MyModels';

export function NotFoundCommand(props: Props) {
  const command = props.props?.command;
  return (
    <div className="text-white">
      Command not found: <span className="text-red-600">"{command}"</span>.
      Please try a different command.
    </div>
  );
}
