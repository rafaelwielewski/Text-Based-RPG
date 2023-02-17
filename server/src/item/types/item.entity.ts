import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  value: number;
}
