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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
    pingPage() {
        return this.pingPongService.pingPage();
    }
    pongPage() {
        return this.pingPongService.pongPage();
    }
    ping_pong(type) {
        return this.pingPongService.ping_pong(type);
    }
};
exports.PingPongController = PingPongController;
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PingPongController.prototype, "pingPage", null);
__decorate([
    (0, common_1.Get)('pong'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PingPongController.prototype, "pongPage", null);
__decorate([
    (0, common_1.Get)('ping-pong/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PingPongController.prototype, "ping_pong", null);
exports.PingPongController = PingPongController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ping_pong_service_1.PingPongService])
], PingPongController);
//# sourceMappingURL=ping-pong.controller.js.map