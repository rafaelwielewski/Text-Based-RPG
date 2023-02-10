import { Test, TestingModule } from '@nestjs/testing';
import { FightController } from './fight.controller';

describe('FightController', () => {
  let controller: FightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FightController],
    }).compile();

    controller = module.get<FightController>(FightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
