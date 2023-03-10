import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  // @PrimaryGeneratedColumn()
  // playerId: number;

  @PrimaryColumn()
  id: string;

  @Column()
  location: string;

  @Column()
  training: string;

  @Column()
  combatLvl: number;

  @Column()
  hitpointsLvl: number;

  @Column()
  attackLvl: number;

  @Column()
  strenghtLvl: number;

  @Column()
  defenceLvl: number;

  @Column()
  hitpointsXP: number;

  @Column()
  attackXP: number;

  @Column()
  strenghtXP: number;

  @Column()
  defenceXP: number;

  @Column()
  hitpointsMax: number;

  @Column()
  hitpoints: number;

  @Column()
  attackBonus: number;

  @Column()
  strenghtBonus: number;

  @Column()
  defenceBonus: number;

  @Column()
  weapon: string;

  @Column()
  chest: string;

  @Column()
  legs: string;

  @Column()
  head: string;

  @Column()
  shield: string;

  @Column()
  hands: string;

  @Column()
  feet: string;

  @Column()
  neck: string;

  @Column()
  ring: string;
}
