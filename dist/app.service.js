"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const process_1 = require("process");
let AppService = class AppService {
    getHello() {
        return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ping-Pong Game</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #FF9441, #FF6B6B);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: relative;
        }
        
        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0.1;
        }
        
        .ball {
            position: absolute;
            border-radius: 50%;
            background: white;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            animation: float 10s infinite ease-in-out;
        }
        
        .ball:nth-child(1) {
            width: 120px;
            height: 120px;
            top: 15%;
            left: 20%;
            animation-delay: 0s;
        }
        
        .ball:nth-child(2) {
            width: 80px;
            height: 80px;
            bottom: 25%;
            right: 25%;
            animation-delay: 1.5s;
        }
        
        .ball:nth-child(3) {
            width: 60px;
            height: 60px;
            top: 40%;
            right: 15%;
            animation-delay: 3s;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            padding: 40px;
            max-width: 800px;
            width: 90%;
            text-align: center;
            z-index: 2;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
            z-index: -1;
        }
        
        h1 {
            color: white;
            font-size: 4rem;
            margin-bottom: 20px;
            text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            position: relative;
            display: inline-block;
        }
        
        h1 span {
            color: #FF9441;
            text-shadow: 0 0 10px rgba(255, 148, 65, 0.5);
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.5rem;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .buttons {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 25px 50px;
            font-size: 1.8rem;
            font-weight: bold;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 250px;
            justify-content: center;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
            z-index: 1;
            transition: all 0.4s ease;
        }
        
        .btn:hover::before {
            transform: translateX(100%);
        }
        
        .btn-ping {
            background: linear-gradient(45deg, #128C7E, #25D366);
            color: white;
        }
        
        .btn-pong {
            background: linear-gradient(45deg, #1E40AF, #3B82F6);
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
        }
        
        .btn:active {
            transform: translateY(0) scale(0.98);
        }
        
        .icon {
            font-size: 2.2rem;
            transition: transform 0.3s ease;
        }
        
        .btn:hover .icon {
            transform: rotate(360deg);
        }
        
        .game-preview {
            width: 100%;
            max-width: 500px;
            height: 250px;
            margin: 30px auto;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
        }
        
        .net {
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            width: 4px;
            background: repeating-linear-gradient(
                to bottom,
                white,
                white 15px,
                transparent 15px,
                transparent 30px
            );
            transform: translateX(-50%);
        }
        
        .preview-ball {
            position: absolute;
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 50%;
            top: 50%;
            left: 30%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
            animation: previewPing 3s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        
        .preview-paddle {
            position: absolute;
            width: 15px;
            height: 80px;
            background: white;
            border-radius: 10px;
        }
        
        .paddle-left {
            left: 10%;
            top: 35%;
            animation: previewLeftPaddle 3s infinite ease-in-out;
        }
        
        .paddle-right {
            right: 10%;
            top: 35%;
            animation: previewRightPaddle 3s infinite ease-in-out;
        }
        
        .instructions {
            margin-top: 40px;
            color: rgba(255, 255, 255, 0.85);
            font-size: 1.2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            background: rgba(0, 0, 0, 0.15);
            padding: 20px;
            border-radius: 15px;
            line-height: 1.6;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(-20px, 20px);
            }
            50% {
                transform: translate(20px, 40px);
            }
            75% {
                transform: translate(30px, -20px);
            }
        }
        
        @keyframes previewPing {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(100px, -30px);
            }
            50% {
                transform: translate(200px, 20px);
            }
            75% {
                transform: translate(300px, -30px);
            }
        }
        
        @keyframes previewLeftPaddle {
            0%, 50% {
                transform: translateY(0);
            }
            25% {
                transform: translateY(-50px);
            }
            75% {
                transform: translateY(50px);
            }
        }
        
        @keyframes previewRightPaddle {
            0%, 25%, 75%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(50px);
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 3rem;
            }
            
            .subtitle {
                font-size: 1.2rem;
            }
            
            .btn {
                padding: 20px 35px;
                font-size: 1.5rem;
                min-width: 220px;
            }
            
            .game-preview {
                height: 200px;
            }
        }
        
        @media (max-width: 480px) {
            .buttons {
                flex-direction: column;
                gap: 20px;
            }
            
            .btn {
                width: 100%;
            }
            
            h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="background">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
    </div>
    
    <div class="container">
        <h1>Ping<span>Pong</span></h1>
        <p class="subtitle">Escolha seu lado e divirta-se neste clássico jogo multiplayer</p>
        
        <div class="game-preview">
            <div class="net"></div>
            <div class="preview-ball"></div>
            <div class="preview-paddle paddle-left"></div>
            <div class="preview-paddle paddle-right"></div>
        </div>
        
        <div class="buttons">
            <button class="btn btn-ping" id="pingBtn">
                <i class="fas fa-table-tennis-paddle-ball icon"></i>
                Jogar como Ping
            </button>
            <button class="btn btn-pong" id="pongBtn">
                <i class="fas fa-table-tennis-paddle-ball icon"></i>
                Jogar como Pong
            </button>
        </div>
        
        <div class="instructions">
            <p><strong>Como jogar:</strong> Após escolher seu lado, clique no botão para enviar a bola para outros jogadores.</p>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const pingBtn = document.getElementById('pingBtn');
            const pongBtn = document.getElementById('pongBtn');
            
            // Obter a URL base dinamicamente
            const baseUrl = window.location.origin;
            
            pingBtn.addEventListener('click', function() {
                window.location.href = "${process_1.env.BASE_URL}/ping-pong/ping";
            });
            
            pongBtn.addEventListener('click', function() {
                window.location.href = "${process_1.env.BASE_URL}/ping-pong/pong";
            });
        });
    </script>
</body>
</html>
`;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map