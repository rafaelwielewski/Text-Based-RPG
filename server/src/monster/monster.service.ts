import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monster } from './types/monster.entity';

@Injectable()
export class MonsterService {
  constructor(
    @InjectRepository(Monster)
    private monsterRepository: Repository<Monster>,
  ) {}

  //   async attack(attackMonsterDto: AttackMonsterDto): Promise<Monster> {

  //     const { playerId, monsterName } = attackMonsterDto

  //     const createdPlayer = new Player();
  //     createdPlayer.id = id;

  //     return this.playerRepository.save(createdPlayer);

  //   }
  async findByName(monsterName: string) {
    return this.monsterRepository.findOne({
      where: {
        name: monsterName,
      },
    });
  }
}
