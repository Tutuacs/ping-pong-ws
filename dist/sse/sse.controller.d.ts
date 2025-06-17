import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class SseController {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sseStream(res: Response): Observable<{
        data: string;
    }>;
}
