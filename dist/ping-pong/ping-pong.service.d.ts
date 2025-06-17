import { RedisService } from 'src/redis/redis.service';
export declare class PingPongService {
    private readonly redis;
    constructor(redis: RedisService);
    pingPage(): string;
    pongPage(): string;
    ping_pong(type: string): Promise<void> | undefined;
}
