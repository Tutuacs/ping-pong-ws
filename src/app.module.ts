import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingPongModule } from './ping-pong/ping-pong.module';
import { WsGateway } from './ws/ws.gateway';

@Module({
  imports: [PingPongModule],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
