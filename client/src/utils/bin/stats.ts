import { getLocation } from '../../api';
import { PlayerService } from '../playerService';

export const stats = async (args: string[], player) => {

    console.log(player)
 
  return `Your Stats are:
AttackXP: ${player.attackxp}, StrenghtXP: ${player.strenghtxp}, DefenseXP: ${player.defensexp};
Attack: ${player.attack}, Strenght: ${player.strenght}, Defense: ${player.defense};
Weapon: ${player.weapon}, Armour: ${player.armour}.
  `;
};
