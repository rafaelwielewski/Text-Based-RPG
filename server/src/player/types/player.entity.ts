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
  hitpointsxp: number;

  @Column()
  attackxp: number;

  @Column()
  strenghtxp: number;

  @Column()
  defensexp: number;

  @Column()
  hitpoints: number;

  @Column()
  attack: number;

  @Column()
  strenght: number;

  @Column()
  defense: number;

  @Column()
  weapon: string;

  @Column()
  armour: string;


}