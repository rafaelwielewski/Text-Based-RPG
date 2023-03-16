import React from 'react';
import { Props } from 'MyModels';

export function MessageCommand(props: Props) {
  const message = props.props?.message;
  return <div className="text-white">{message}</div>;
}
