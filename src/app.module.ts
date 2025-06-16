import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingPongModule } from './ping-pong/ping-pong.module';
import { WsGateway } from './ws/ws.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PingPongModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
