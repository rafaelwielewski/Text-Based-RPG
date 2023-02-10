import { Command } from "../Command";

export default class AboutCommand extends Command {
  constructor() {
    super({ name: "about" });
  }

  render(): string | JSX.Element {
    return <p>{"I'm Rafael Wielwski, I'm learning to be a backend developer. I hope you like my game!! Thanks For playing."}</p>;
  }
}
