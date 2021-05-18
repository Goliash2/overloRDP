import { Test, TestingModule } from '@nestjs/testing';
import { FailsController } from './fails.controller';

describe('FailsController', () => {
  let controller: FailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailsController],
    }).compile();

    controller = module.get<FailsController>(FailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
