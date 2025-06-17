import { OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RedisService implements OnModuleInit {
    private eventEmitter;
    private pubClient;
    private subClient;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2);
    onModuleInit(): Promise<void>;
    publish(channel: string, message: string): Promise<void>;
}
