import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Index, Repository } from 'typeorm';
import { Inventory } from './types/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(id: string): Promise<Inventory> {
    const createdInventory = new Inventory();
    createdInventory.id = id;
    return this.inventoryRepository.save(createdInventory);
  }

  async findById(id: string) {
    return this.inventoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async lootAll(dropDto): Promise<Inventory> {
    const { drop, id } = dropDto;
    const inventory = await this.findById(id);
    const inventoryArray = [];
    Object.entries(inventory).forEach((entry) => {
      const [key, value] = entry;
      inventoryArray.push(value);
    });
    for (let i = 0; i < drop.length; i = i + 2) {
      for (
        let i2 = 1;
        i2 < inventoryArray.length && inventoryArray[i2] !== '';
        i2 = i2 + 2
      ) {
        if (inventoryArray[i2] === drop[i]) {
          inventory['quantity' + (i2 + 1) / 2] =
            inventoryArray[i2 + 1] + drop[i + 1];
        }
      }
      if (!inventoryArray.includes(drop[i])) {
        for (let i3 = 1; i3 < inventoryArray.length; i3 = i3 + 2) {
          if (inventoryArray[i3] === '') {
            inventory['item' + (i3 + 1) / 2] = drop[i];
            inventory['quantity' + (i3 + 1) / 2] = drop[i + 1];

            inventoryArray[i3] = drop[i];
            inventoryArray[i3 + 1] = drop[i + 1];
            break;
          }
        }
      }
    }
    return this.inventoryRepository.save(inventory);
  }
}
