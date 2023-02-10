import { Test, TestingModule } from '@nestjs/testing';
import { MonsterController } from './monster.controller';

describe('MonsterController', () => {
  let controller: MonsterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonsterController],
    }).compile();

    controller = module.get<MonsterController>(MonsterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
