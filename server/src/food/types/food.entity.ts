import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryColumn()
  id: string;

  @Column()
  hitpoints: number;

  @Column()
  raw: boolean;
}
