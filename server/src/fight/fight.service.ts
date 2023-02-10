import { Injectable } from '@nestjs/common';
import { MonsterService } from 'src/monster/monster.service';
import { PlayerService } from 'src/player/player.service';
import { UserService } from 'src/user/user.service';
import { FightDto } from './dto/fightDto';
import { FightStartDto } from './dto/fightStartDto';

@Injectable()
export class FightService {
  constructor(
    private playerService: PlayerService,
    private monsterService: MonsterService,
    private userService: UserService,
  ) {}

  async fightStart(fightStartDto: FightStartDto) {
    const { playerId, monsterName } = fightStartDto;

    const monster = await this.monsterService.findByName(monsterName);
    const user = await this.userService.findById(playerId);
    const player = await this.playerService.findById(playerId);

    const fight = {
      username: user.username,
      player: player,
      monster: monster,
      status: 'fighting',
      playerHit: 0,
      monsterHit: 0,
    };

    return fight;
  }

  async attack(fightDto: FightDto) {
    let { player, monster, username, monsterHit, playerHit } = fightDto;

    const playerMaxHit = await this.maxHit(
      player.strenghtLvl,
      player.strenghtBonus,
    );
    const playerAttackRoll = await this.attackRoll(
      player.attackLvl,
      player.attackBonus,
    );
    const playerDefenceRoll = await this.attackRoll(
      player.defenceLvl,
      player.defenceBonus,
    );

    const monsterMaxHit = await this.maxHit(
      monster.strenghtLvl,
      monster.strenghtBonus,
    );
    const monsterAttackRoll = await this.attackRoll(
      monster.attackLvl,
      monster.attackBonus,
    );
    const monsterDefenceRoll = await this.attackRoll(
      monster.defenceLvl,
      monster.defenceBonus,
    );
    //hit chance
    const playerHitChance = await this.attackRoll(
      playerAttackRoll,
      monsterDefenceRoll,
    );

    const monsterHitChance = await this.attackRoll(
      monsterAttackRoll,
      playerDefenceRoll,
    );

    //hit
    playerHit = await this.hit(playerMaxHit, playerHitChance);
    monsterHit = await this.hit(monsterMaxHit, monsterHitChance);
    // set hp
    player.hitpoints = player.hitpoints - monsterHit;
    monster.hitpoints = monster.hitpoints - playerHit;
    let lvlUp;
    if (player.hitpoints < 0) {
      player.hitpoints = 0;
    }
    if (monster.hitpoints <= 0) {
      monster.hitpoints = 0;
      lvlUp = await this.playerService.gainXp(player.id, monster.xp);
      console.log(lvlUp);
    }
    // save player hp
    const fight = {
      player,
      monster,
      username,
      playerHit,
      monsterHit,
      lvlUp,
    };
    return fight;
  }

  async maxHit(strenghtLvl: number, strenght: number) {
    const maxHit = Math.round(
      ((strenghtLvl + 8 + 3) * (strenght + 50) + 250) / 500,
    );
    if (maxHit < 1) {
      return 1;
    } else {
      return maxHit;
    }
  }

  async attackRoll(attackLvl: number, attackBonus: number) {
    const attackRoll = (attackLvl + 8 + 3) * (attackBonus + 50);

    return attackRoll;
  }

  async DefenceRoll(targetDefenceLvl: number, targetDefence: number) {
    const defenceRoll = (targetDefenceLvl + 9) * (targetDefence + 50);

    return defenceRoll;
  }

  async hitChance(attackRoll: number, DefenceRoll: number) {
    if (attackRoll > DefenceRoll) {
      const hitChance = 1 - (DefenceRoll + 2) / (2 * (attackRoll + 1));
      return hitChance;
    } else {
      const hitChance = attackRoll / (2 * (DefenceRoll + 1));
      return hitChance;
    }
  }
  async hit(maxHit: number, hitChance: number) {
    if (Math.random() < hitChance) {
      return this.randomInteger(1, maxHit);
    } else {
      return 0;
    }
  }

  async randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async test() {
    const maxHit = Math.round(((50 + 8 + 3) * (1 + 50) + 250) / 500);
    return maxHit;
  }
}
