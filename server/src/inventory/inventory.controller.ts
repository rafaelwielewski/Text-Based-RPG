import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('lootall')
  async saveLoot(@Body() drop) {
    return await this.inventoryService.lootAll(drop);
  }
}
