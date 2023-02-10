export function getCommandName(args: string[]) {
  const [_commandName, ...rest] = args;

  const commandName = _commandName;
  const commandArgs = rest;

  return { commandArgs, commandName };
}

export function classNames(...classNames: unknown[]) {
  return classNames.filter(Boolean).join(" ");
}

export interface CommandOutputOptions {
  command: string;
}

export type CommandOutputFunc = (options: CommandOutputOptions) => JSX.Element | string;

export const initBanner: CommandOutputFunc = () => (
  <p className="">
    <span className="block font-title text-title text-orange-300 text-center leading-normal">
      {`Written Kingdom`}
    </span>
    <span className="block mt-3 text-center text-white text-base">
      {"Welcome! Enter 'help' to see list of available commands."}
    </span>
  </p>
);

export const commandNotFound: CommandOutputFunc = ({ command }) => (
  <p>{`zsh: command not found: ${command}. Please try a different command.`}</p>
);
export const test: CommandOutputFunc = ({ command }) => (
  <p>{`sdfsdfsdf: ${command}. sdfsdf`}</p>
);
