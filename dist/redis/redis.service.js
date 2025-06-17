"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const event_emitter_1 = require("@nestjs/event-emitter");
const process_1 = require("process");
let RedisService = RedisService_1 = class RedisService {
    eventEmitter;
    pubClient;
    subClient;
    logger = new common_1.Logger(RedisService_1.name);
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async onModuleInit() {
        try {
            const redisConfig = {
                username: process_1.env.REDIS_USER || 'default',
                password: process_1.env.REDIS_PASSWORD,
                socket: {
                    host: process_1.env.REDIS_HOST || 'localhost',
                    port: Number(process_1.env.REDIS_PORT) || 6379,
                    connectTimeout: 10000,
                    reconnectStrategy: (retries) => {
                        if (retries > 5) {
                            this.logger.error('Max retries reached. Giving up on Redis connection');
                        }
                        return Math.min(500 * Math.pow(2, retries), 8000);
                    }
                }
            };
            this.pubClient = (0, redis_1.createClient)(redisConfig);
            this.pubClient.on('error', err => this.logger.error('Redis Pub Client Error', err));
            this.pubClient.on('connect', () => this.logger.log('Redis Pub Client Connected'));
            this.pubClient.on('reconnecting', () => this.logger.warn('Redis Pub Client Reconnecting'));
            await this.pubClient.connect();
            this.subClient = this.pubClient.duplicate();
            this.subClient.on('error', err => this.logger.error('Redis Sub Client Error', err));
            this.subClient.on('connect', () => this.logger.log('Redis Sub Client Connected'));
            this.subClient.on('reconnecting', () => this.logger.warn('Redis Sub Client Reconnecting'));
            await this.subClient.connect();
            await this.subClient.subscribe('pong', (message, channel) => {
                this.eventEmitter.emit('redis.message', { channel, message });
            });
            await this.subClient.subscribe('ping', (message, channel) => {
                this.eventEmitter.emit('redis.message', { channel, message });
            });
            this.logger.log('Redis clients connected and subscribed');
        }
        catch (error) {
            this.logger.error('Failed to initialize Redis service', error);
            throw error;
        }
    }
    async publish(channel, message) {
        try {
            await this.pubClient.publish(channel, message);
            this.logger.log(`Published to ${channel}: ${message}`);
        }
        catch (error) {
            this.logger.error(`Failed to publish to ${channel}`, error);
            throw error;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], RedisService);
//# sourceMappingURL=redis.service.js.map