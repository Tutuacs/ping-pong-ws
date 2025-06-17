import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingPongModule } from './ping-pong/ping-pong.module';
import { WsGateway } from './ws/ws.gateway';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { SseModule } from './sse/sse.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PingPongModule, EventEmitterModule.forRoot({
    global: true,
  }), ConfigModule.forRoot({
    isGlobal: true,
  }), RedisModule, SseModule],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
