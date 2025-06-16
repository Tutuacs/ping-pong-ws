import { Test, TestingModule } from '@nestjs/testing';
import { PingPongController } from './ping-pong.controller';
import { PingPongService } from './ping-pong.service';

describe('PingPongController', () => {
  let controller: PingPongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PingPongController],
      providers: [PingPongService],
    }).compile();

    controller = module.get<PingPongController>(PingPongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
