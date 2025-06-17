import { Module } from '@nestjs/common';
import { PingPongService } from './ping-pong.service';
import { PingPongController } from './ping-pong.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [PingPongController],
  providers: [PingPongService],
})
export class PingPongModule {}
