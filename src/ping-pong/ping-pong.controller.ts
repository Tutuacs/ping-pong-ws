import { Controller, Get } from '@nestjs/common';
import { PingPongService } from './ping-pong.service';

@Controller('ping-pong')
export class PingPongController {
  constructor(private readonly pingPongService: PingPongService) {}

  @Get('ping')
  ping() {
    return this.pingPongService.pingPage();
  }

  @Get('pong')
  pong() {
    return this.pingPongService.pongPage();
  }

}
