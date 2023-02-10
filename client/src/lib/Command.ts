import React from "react";

interface CommandOptions {
  name: string;
}

const commandMap = new Map<string, Command>();

export interface CommandRenderOptions {
  commands: string[];
  command: string;
  args: string[],
  user,
  player,
  location,
}


export abstract class Command extends React.Component {
  options: CommandOptions;

  constructor(options: CommandOptions) {
    super(options)
    this.options = options;
  }
  abstract render(renderOptions: CommandRenderOptions): JSX.Element | string | { render: JSX.Element | string, data: {} };
}

// export abstract class Execute {
//   options: CommandOptions;

//   constructor(options: CommandOptions) {
//     this.options = options;
//   }

//   abstract execute(renderOptions: CommandRenderOptions) ;
// }






export async function loadCommands() {
  const commands = await Promise.all([
    import("./commands/HelpCommand"),
    import("./commands/AboutCommand"),
    import("./commands/TestCommand"),
    import("./commands/LocationCommand"),
    import("./commands/MoveCommand"),
    import("./commands/AttackCommand"),
  ]);

  for (const file of commands) {
    const command = new file.default();
    commandMap.set(command.options.name, command);
  }

  return commandMap;
}
