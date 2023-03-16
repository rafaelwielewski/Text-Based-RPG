import { ReactElement } from 'react';

declare module 'MyModels' {
  export type CommandState = {
    index: number;
    input: string;
    status?: 'init' | 'failed' | 'success';
  };
  export type NewCommand = {
    index: number;
    input: string;
  };
  interface CommandOptions {
    name: string;
  }
  export interface CommandProps {
    command?: string;
    message?: string;
    user?: any;
    player?: Player;
    location?: any;
    fight?: any;
    inventory?: Inventory[];
  }
  export interface Props {
    props?: Partial<CommandProps>;
  }
  export interface Inventory {
    item: string;
    quantity: number;
  }
}
