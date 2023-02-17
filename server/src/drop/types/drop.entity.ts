import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Drop {
  @PrimaryColumn()
  id: string;

  @Column()
  item1: string;

  @Column()
  quantity1: number;

  @Column()
  chance1: number;

  @Column()
  item2: string;

  @Column()
  quantity2: number;

  @Column()
  chance2: number;

  @Column()
  item3: string;

  @Column()
  quantity3: number;

  @Column()
  chance3: number;

  @Column()
  item4: string;

  @Column()
  quantity4: number;

  @Column()
  chance4: number;

  @Column()
  item5: string;

  @Column()
  quantity5: number;

  @Column()
  chance5: number;

  @Column()
  item6: string;

  @Column()
  quantity6: number;

  @Column()
  chance6: number;

  @Column()
  item7: string;

  @Column()
  quantity7: number;

  @Column()
  chance7: number;

  @Column()
  item8: string;

  @Column()
  quantity8: number;

  @Column()
  chance8: number;

  @Column()
  item9: string;

  @Column()
  quantity9: number;

  @Column()
  chance9: number;

  @Column()
  item10: string;

  @Column()
  quantity10: number;

  @Column()
  chance10: number;
}
