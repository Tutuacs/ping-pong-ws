import { Controller, Get, Param } from '@nestjs/common';
import { PingPongService } from './ping-pong.service';

@Controller()
export class PingPongController {
  constructor(private readonly pingPongService: PingPongService) {}

  @Get('ping')
  pingPage() {
    return this.pingPongService.pingPage();
  }

  @Get('pong')
  pongPage() {
    return this.pingPongService.pongPage();
  }

  @Get('ping-pong/:type')
  ping_pong(@Param('type') type: string) {
    return this.pingPongService.ping_pong(type);
  }

}
