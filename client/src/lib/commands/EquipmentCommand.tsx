import { Command } from "../Command";

export default class StatsCommand extends Command {
  constructor() {
    super({ name: "equips" });

  }

  render({ player }): string | JSX.Element {
    console.log(player)
    return (
    <div>
    <p>Weapon: {player.weapon}, Shield: {player.shield};</p>
    <p>Head: {player.head}, Chest: {player.Chest}, Legs: {player.legs}, Feet: {player.feet}, Hands: {player.hands}, Head: {player.head};</p>
    <p>Neck: {player.neck}, Ring: {player.ring};</p>
    </div>
    );
  }
}
