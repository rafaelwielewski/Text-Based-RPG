import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drop } from './types/drop.entity';

@Injectable()
export class DropService {
  constructor(
    @InjectRepository(Drop)
    private dropRepository: Repository<Drop>,
  ) {}

  async findById(id: string) {
    return this.dropRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async getDrop(id: string) {
    const dropTable = await this.findById(id);
    const dropTableArray = [];
    //const drop = {};
    const drop2 = [];
    //let dropIndex = 1;
    Object.entries(dropTable).forEach((entry) => {
      const [key, value] = entry;
      dropTableArray.push(value);
    });

    for (
      let i = 1;
      i < dropTableArray.length && dropTableArray[i] !== '';
      i = i + 3
    ) {
      if (Math.random() < dropTableArray[i + 2] / 100) {
        // drop['Drop' + dropIndex] = dropTableArray[i];
        // drop['Quantity' + dropIndex] = dropTableArray[i + 1];
        drop2.push(dropTableArray[i]);
        drop2.push(dropTableArray[i + 1]);
        //dropIndex++;
      }
    }
    return drop2;
  }
}
