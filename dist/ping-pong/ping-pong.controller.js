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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingPongController = void 0;
const common_1 = require("@nestjs/common");
const ping_pong_service_1 = require("./ping-pong.service");
let PingPongController = class PingPongController {
    pingPongService;
    constructor(pingPongService) {
        this.pingPongService = pingPongService;
    }
    ping() {
        return this.pingPongService.pingPage();
    }
    pong() {
        return this.pingPongService.pongPage();
    }
};
exports.PingPongController = PingPongController;
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PingPongController.prototype, "ping", null);
__decorate([
    (0, common_1.Get)('pong'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PingPongController.prototype, "pong", null);
exports.PingPongController = PingPongController = __decorate([
    (0, common_1.Controller)('ping-pong'),
    __metadata("design:paramtypes", [ping_pong_service_1.PingPongService])
], PingPongController);
//# sourceMappingURL=ping-pong.controller.js.map