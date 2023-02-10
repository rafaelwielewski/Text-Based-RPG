import { Command } from "../Command";

export default class TestCommand extends Command {
  constructor() {
    super({ name: "test" });

  }

  render({ data }): string | JSX.Element {
    console.log(data);
    return <p>{ data.player.id }</p>;
  }
}
