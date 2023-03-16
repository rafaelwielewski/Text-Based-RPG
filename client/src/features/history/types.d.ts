import { CommandProps } from '../command/Command';

declare module 'MyModels' {
  export type HistoryState = {
    history: History[];
  };
  export type History = {
    index: number;
    command: string;
    props?: Partial<CommandProps>;
    status?: 'init' | 'failed' | 'success';
  };
}
