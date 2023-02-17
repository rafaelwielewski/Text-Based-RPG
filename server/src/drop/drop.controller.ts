import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { DropService } from './drop.service';

@Controller('drop')
export class DropController {
  constructor(private readonly dropService: DropService) {}

  @Get(':id')
  async getDrop(@Param('id') id: string) {
    return await this.dropService.getDrop(id);
  }
}
