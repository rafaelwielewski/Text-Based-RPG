import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  attackLvl: number;

  @Column()
  strenghtLvl: number;

  @Column()
  defenceLvl: number;

  @Column()
  attackBonus: number;

  @Column()
  strenghtBonus: number;

  @Column()
  defenceBonus: number;
}
