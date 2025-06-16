import { Test, TestingModule } from '@nestjs/testing';
import { PingPongService } from './ping-pong.service';

describe('PingPongService', () => {
  let service: PingPongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingPongService],
    }).compile();

    service = module.get<PingPongService>(PingPongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
