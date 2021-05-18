import { Test, TestingModule } from '@nestjs/testing';
import { FailsService } from './fails.service';

describe('FailsService', () => {
  let service: FailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailsService],
    }).compile();

    service = module.get<FailsService>(FailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
