import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  north: string;

  @Column()
  east: string;

  @Column()
  south: string;

  @Column()
  west: string;

  @Column()
  action: string;

  @Column()
  enemyName: string;

  @Column()
  shopName: string;

}