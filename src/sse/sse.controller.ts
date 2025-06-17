import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('sse')
export class SseController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Get('stream')
  @Sse()
  sseStream(@Res() res: Response) {
    // Cria um observable a partir de eventos emitidos
    return fromEvent(this.eventEmitter, 'redis.message').pipe(
      map((data: any) => ({
        data: JSON.stringify({
          channel: data.channel,
          message: data.message,
        }),
      }))
    );
  }
}