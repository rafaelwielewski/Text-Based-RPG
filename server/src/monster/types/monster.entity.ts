import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  combatLvl: number;

  @Column()
  attackLvl: number;

  @Column()
  strenghtLvl: number;

  @Column()
  defenceLvl: number;

  @Column()
  xp: number;

  @Column()
  hitpoints: number;

  @Column()
  attackBonus: number;

  @Column()
  strenghtBonus: number;

  @Column()
  defenceBonus: number;

  @Column()
  dropTable: string;
}
