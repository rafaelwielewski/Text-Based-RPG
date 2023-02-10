import { attackApi, fightStart } from '@/api';
import { Command, CommandRenderOptions } from '../Command';

export default class AttackCommand extends Command {
  constructor() {
    super({ name: 'attack' });
  }

  private sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async getMonster(player, location) {
    console.log(location.monsterName)
    if (location.monsterName !== 'Nothing') {
      const fight = await fightStart(player.id, location.monsterName);
      if (fight.monster === null) {
        return null;
      } else {
        return fight;
      }
    } else {
      return null;
    }
  }

  async attack(fight) {
    const fightResult = await attackApi(fight);
    console.log(fightResult);
    await this.sleep(3000);
    return fightResult;
  }

  async monsterKilled(fight) {
    return fight;
  }

  render(fight): string | JSX.Element {
    let render: string | JSX.Element;
    if (fight === null) {
      render = (<div>There are no enemies to attack</div>)
      return render;
    }
    if (fight.player.hitpoints > 0 && fight.monster.hitpoints > 0) {
      render = (
        <div className="">
          <p className="text-center text-md text-orange-300 pb-4">
            Fight Started...
          </p>
          <p className="text-center pb-4">
            <span className="text-blue-400">
              {fight.username} - Level {fight.player.combatLvl}
            </span>
            <span className=""> | HP: {fight.player.hitpoints}</span>
            { fight.playerHit === 0 ? <span className="text-blue-400">(-{fight.monsterHit})</span> : <span className="text-red-500">(-{fight.monsterHit})</span>}
          </p>
          <p className="text-center pb-4">X</p>
          <p className="text-center pb-4">
            <span className="text-red-400">
              {fight.monster.name} - Level {fight.monster.lvl}
            </span>
            <span className=""> | HP: {fight.monster.hitpoints}</span>
            { fight.playerHit === 0 ? <span className="text-blue-400">(-{fight.playerHit})</span> : <span className="text-red-500">(-{fight.playerHit})</span>}
          </p>
        </div>
      );
      return render;
    }
    if (fight.player.hitpoints === 0) {
      render = (
        <div className="">
          <p className="text-center text-md text-red-500 pb-4">
            You have died...
          </p>
        </div>
      );
      return render;
    }
    if (fight.monster.hitpoints === 0) {

      render = (
        <div className="text-center">
          <p className="text-md text-green-500 pb-4">
            You killed the {fight.monster.name}.
          </p>
          <p className="pb-4">
            You received {fight.monster.xp} xp.
          </p>
          { 
            fight.lvlUp.attackLvlUp || 
            fight.lvlUp.strenghtLvlUp || 
            fight.lvlUp.defenceLvlUp || 
            fight.lvlUp.hitpointsLvlUp ||
            fight.lvlUp.combatLvlUp ? <p className='text-md text-orange-300'>Congratulations!</p> : null
          }
          { 
            fight.lvlUp.combatLvlUp ? <p className='text-green-400'>You just advanced Combat level to {fight.lvlUp.combatLvl}.</p> : null
          }
          { 
            fight.lvlUp.attackLvlUp ? <p className='text-red-700'>You just advanced Attack level to {fight.lvlUp.attackLvl}.</p> : null
          }
          { 
            fight.lvlUp.strenghtLvlUp ? <p className='text-green-700'>You just advanced Strenght level to {fight.lvlUp.strenghtLvl}.</p> : null
          }
          { 
            fight.lvlUp.defenceLvlUp ? <p className='text-blue-500'>You just advanced Defence level to {fight.lvlUp.defenceLvl}.</p> : null
          }
          { 
            fight.lvlUp.hitpointsLvlUp ? <p className='text-red-200'>You just advanced Hitpoints level to {fight.lvlUp.hitpointsLvl}.</p> : null
          }



        </div>
      );
      return render;
    }
    return render;
  }
}
