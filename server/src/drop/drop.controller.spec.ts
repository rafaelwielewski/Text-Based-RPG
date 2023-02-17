import { Test, TestingModule } from '@nestjs/testing';
import { DropController } from './drop.controller';

describe('DropController', () => {
  let controller: DropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DropController],
    }).compile();

    controller = module.get<DropController>(DropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
