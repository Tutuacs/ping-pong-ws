import { PingPongService } from './ping-pong.service';
export declare class PingPongController {
    private readonly pingPongService;
    constructor(pingPongService: PingPongService);
    ping(): string;
    pong(): string;
}
