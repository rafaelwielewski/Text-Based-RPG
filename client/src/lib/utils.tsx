export function getCommandName(args: string[]) {
  const [_commandName, ...rest] = args;

  const isSudo = _commandName === "sudo" && rest.length >= 1;
  const commandName = isSudo ? rest[0] : _commandName;
  const commandArgs = isSudo ? rest.slice(1, rest.length) : rest;

  return { isSudo, commandArgs, commandName };
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
    <span className="block font-title text-title text-orange-300 text-center">
      {`Written Kingdom`}
    </span>
    <span className="block mt-3 text-center text-white text-base">
      {"Welcome to this epic site! Enter 'help' to see list of available commands."}
    </span>
  </p>
);

export const commandNotFound: CommandOutputFunc = ({ command }) => (
  <p>{`zsh: command not found: ${command}. Please try a different command.`}</p>
);
export const test: CommandOutputFunc = ({ command }) => (
  <p>{`sdfsdfsdf: ${command}. sdfsdf`}</p>
);
