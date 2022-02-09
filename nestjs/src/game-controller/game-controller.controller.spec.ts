import { Test, TestingModule } from '@nestjs/testing';
import { GameControllerController } from './game-controller.controller';

describe('GameControllerController', () => {
  let controller: GameControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameControllerController],
    }).compile();

    controller = module.get<GameControllerController>(GameControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
