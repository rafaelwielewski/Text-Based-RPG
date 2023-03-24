import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentService } from '../equipment/equipment.service';
import { InventoryService } from '../inventory/inventory.service';
import { ItemService } from '../item/item.service';
import { LocationDto } from '../location/dto/locationDto';
import { LocationService } from '../location/location.service';
import { MonsterService } from '../monster/monster.service';
import { Monster } from '../monster/types/monster.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AttackMonsterDto } from './dto/AttackMonsterDto';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { EquipDto } from './dto/equipDto';
import { FightStartDto } from './dto/fightStartDto';
import { LvlUpDto } from './dto/lvlUpDto';
import { MovePlayerDto } from './dto/movePlayerDto';
import { Player } from './types/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private locationService: LocationService,
    private monsterService: MonsterService,
    private userService: UserService,
    private itemService: ItemService,
    private inventoryService: InventoryService,
    private equipmentService: EquipmentService,
  ) {}

  async create(createdPlayerDto: CreatePlayerDto): Promise<Player> {
    //console.log(createPlayerDto);
    const { id } = createdPlayerDto;

    const createdPlayer = new Player();
    createdPlayer.id = id;
    createdPlayer.location = 'Lumbridge';
    createdPlayer.training = 'All';
    createdPlayer.combatLvl = 3;
    createdPlayer.hitpointsLvl = 1;
    createdPlayer.attackLvl = 1;
    createdPlayer.strenghtLvl = 1;
    createdPlayer.defenceLvl = 1;
    createdPlayer.hitpointsXP = 1;
    createdPlayer.attackXP = 1;
    createdPlayer.strenghtXP = 1;
    createdPlayer.defenceXP = 1;
    createdPlayer.hitpointsMax = 10;
    createdPlayer.hitpoints = 10;
    createdPlayer.attackBonus = 1;
    createdPlayer.strenghtBonus = 1;
    createdPlayer.defenceBonus = 1;
    createdPlayer.weapon = 'Empty';
    createdPlayer.chest = 'Empty';
    createdPlayer.legs = 'Empty';
    createdPlayer.head = 'Empty';
    createdPlayer.shield = 'Empty';
    createdPlayer.hands = 'Empty';
    createdPlayer.feet = 'Empty';
    createdPlayer.neck = 'Empty';
    createdPlayer.ring = 'Empty';

    return this.playerRepository.save(createdPlayer);
  }
  // async lowercaseKeys(obj) {
  //   const entries = Object.entries(obj);

  //   return Object.fromEntries(
  //     entries.map(([key, value]) => {
  //       return [key, value.toLowerCase()];
  //     }),
  //   );
  // }

  async equip(equipDto: EquipDto) {
    const { playerId, equipmentName } = equipDto;
    console.log(equipmentName);
    const item = await this.itemService.findById(equipmentName);
    console.log(item);
    if (item === null) {
      return {
        error: `You cannot equip this item. This equipment doesn't exists.`,
      };
    }

    const inventory = await this.inventoryService.findById(playerId);

    if (!Object.values(inventory).includes(item.id)) {
      return { error: `You cannot equip this item. Item not in inventory` };
    }

    const equipment = await this.equipmentService.findById(equipmentName);
    const player = await this.findById(playerId);
    if (
      equipment.attackLvl >= player.attackLvl &&
      equipment.strenghtLvl >= player.strenghtLvl &&
      equipment.defenceLvl >= player.defenceLvl
    ) {
      return {
        error: `You cannot equip this item, you don't have the minimun levels. attack level: ${equipment.attackLvl}, strenght level: ${equipment.strenghtLvl} defence level: ${equipment.defenceLvl}.`,
      };
    }
    const equiped = await this.equipmentService.findById(
      player[equipment.type.toLowerCase()],
    );

    const newPlayer = new Player();
    newPlayer.id = playerId;
    newPlayer[equipment.type.toLowerCase()] = equipment.id;
    newPlayer.attackBonus =
      player.attackBonus - equiped.attackBonus + equipment.attackBonus;
    newPlayer.strenghtBonus =
      player.strenghtBonus - equiped.strenghtBonus + equipment.strenghtBonus;
    newPlayer.defenceBonus =
      player.defenceBonus - equiped.defenceBonus + equipment.defenceBonus;
    console.log(newPlayer);
    await this.playerRepository.save(newPlayer);
    return await this.findById(playerId);
  }

  async move(movePlayerDto: MovePlayerDto): Promise<Player> {
    const { id, location } = movePlayerDto;
    const movePlayer = new Player();
    movePlayer.id = id;
    movePlayer.location = location;
    return this.playerRepository.save(movePlayer);
  }

  async gainXp(id: string, xp: number) {
    let lvlUp = {
      attackLvlUp: false,
      attackLvl: NaN,
      strenghtLvlUp: false,
      strenghtLvl: NaN,
      defenceLvlUp: false,
      defenceLvl: NaN,
      hitpointsLvlUp: false,
      hitpointsLvl: NaN,
      combatLvlUp: false,
      combatLvl: NaN,
    };
    let player = await this.playerRepository.findOne({
      where: {
        id: id,
      },
    });
    let newAttackXp: number;
    let newStrenghtXp: number;
    let newDefenceXp: number;
    let newHitpointsXp: number;
    if (player.training === 'All') {
      newAttackXp = player.attackXP + xp / 4;
      newStrenghtXp = player.strenghtXP + xp / 4;
      newDefenceXp = player.defenceXP + xp / 4;
      newHitpointsXp = player.hitpointsXP + xp / 4;
    }
    const newAttackLvl = await this.getLevelAtExperience(newAttackXp);
    const newStrenghtLvl = await this.getLevelAtExperience(newStrenghtXp);
    const newDefenceLvl = await this.getLevelAtExperience(newDefenceXp);
    const newHitpointsLvl = await this.getLevelAtExperience(newHitpointsXp);
    const newCombatLvl = await this.getCombatLevel(
      player.attackLvl,
      player.strenghtLvl,
      player.defenceLvl,
      player.hitpointsLvl,
    );

    if (player.attackLvl < newAttackLvl) {
      lvlUp.attackLvlUp = true;
      lvlUp.attackLvl = newAttackLvl;
      player.attackLvl = newAttackLvl;
    }
    if (player.strenghtLvl < newStrenghtLvl) {
      lvlUp.strenghtLvlUp = true;
      lvlUp.strenghtLvl = newStrenghtLvl;
      player.strenghtLvl = newStrenghtLvl;
    }
    if (player.defenceLvl < newDefenceLvl) {
      lvlUp.defenceLvlUp = true;
      lvlUp.defenceLvl = newDefenceLvl;
      player.defenceLvl = newDefenceLvl;
    }
    if (player.hitpointsLvl < newHitpointsLvl) {
      lvlUp.hitpointsLvlUp = true;
      lvlUp.hitpointsLvl = newHitpointsLvl;
      player.hitpointsLvl = newHitpointsLvl;
      player.hitpoints = newHitpointsLvl;
      player.hitpointsMax = newHitpointsLvl;
    }
    if (player.combatLvl < newCombatLvl) {
      lvlUp.combatLvlUp = true;
      lvlUp.combatLvl = newCombatLvl;
      player.combatLvl = newCombatLvl;
    }
    player.attackXP = newAttackXp;
    player.strenghtXP = newStrenghtXp;
    player.defenceXP = newDefenceXp;
    player.hitpointsXP = newHitpointsXp;
    console.log(player);
    console.log(lvlUp);
    this.playerRepository.save(player);
    return lvlUp;
  }
  async getCombatLevel(
    attackLvl: number,
    strenghtLvl: number,
    defenceLvl: number,
    hitpointsLvl: number,
  ) {
    const melee = (13 / 40) * (attackLvl + strenghtLvl);
    const base = (1 / 4) * (defenceLvl + hitpointsLvl);
    const combatLvl = melee + base;
    return Math.floor(combatLvl);
  }
  async getExperienceAtLevel(lvl: number) {
    let total = 0;
    for (let i = 1; i < lvl; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7.0));
      console.log(total);
    }
    return Math.floor(total / 4);
  }
  async getLevelAtExperience(xp: number) {
    let index;
    console.log(xp);
    for (index = 0; index < 99; index++) {
      if ((await this.getExperienceAtLevel(index + 1)) > xp) break;
    }
    console.log(index);
    return index;
  }

  async findById(id: string) {
    //console.log(id)
    return this.playerRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
