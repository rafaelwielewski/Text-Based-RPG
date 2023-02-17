import { Command } from "../Command";

export default class StatsCommand extends Command {
  constructor() {
    super({ name: "stats" });

  }

  render({ player }): string | JSX.Element {
    console.log(player)
    return (
    <div>
    <p>HP: {player.hitpoints};</p>
    <p>Combat Level: {player.combatLvl} Attack Level: {player.attackLvl}, Strenght Level: {player.strenghtLvl}, Defense Level: {player.defenceLvl}, Hitpoints Level: {player.hitpointsLvl};</p>
    <p>Attack XP: {player.attackXP}, Strenght XP: {player.strenghtXP}, Defense XP: {player.defenceXP}, Hitpoints XP: {player.hitpointsXP};</p>
    </div>
    );
  }
}
