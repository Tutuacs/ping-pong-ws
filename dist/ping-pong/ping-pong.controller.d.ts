import { PingPongService } from './ping-pong.service';
export declare class PingPongController {
    private readonly pingPongService;
    constructor(pingPongService: PingPongService);
    pingPage(): string;
    pongPage(): string;
    ping_pong(type: string): Promise<void> | undefined;
}
