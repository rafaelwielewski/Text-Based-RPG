import { Test, TestingModule } from '@nestjs/testing';
import { FightService } from './fight.service';

describe('FightService', () => {
  let service: FightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FightService],
    }).compile();

    service = module.get<FightService>(FightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
