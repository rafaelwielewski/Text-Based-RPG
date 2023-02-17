import { Test, TestingModule } from '@nestjs/testing';
import { DropService } from './drop.service';

describe('DropService', () => {
  let service: DropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DropService],
    }).compile();

    service = module.get<DropService>(DropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
