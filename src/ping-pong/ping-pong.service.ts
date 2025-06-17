import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PingPongService {

    constructor(private readonly redis: RedisService) {}

    pingPage() {
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Ping Page</title>
        <style>
            .container {
            background: #FF9441;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            }
            
            .title {
            display: block;
            width: 100%;
            position: absolute;
            top: 20px;
            text-align: center;
            font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
            color: #FFF;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-size: 2.5rem;
            z-index: 10;
            }
            
            .actionButton {
            position: absolute;
            bottom: 30px;
            padding: 15px 50px;
            font-size: 1.8rem;
            font-weight: bold;
            background: #128C7E;
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10;
            }
            
            .actionButton:hover {
            background: #25D366;
            transform: scale(1.05);
            }
            
            .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #FF9441;
            padding: 80px 100px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            font-size: 5rem;
            font-weight: bold;
            text-align: center;
            z-index: 20;
            display: none;
            }
            
            .spinner {
            position: relative;
            text-align: center;
            margin-top: 50px;
            width: 300px;
            height: 300px;
            }
            
            .ballContainer {
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 5;
            }
            
            .ball {
            width: 40px;
            transform: translate(-50%, -50%);
            transform-origin: bottom;
            }
            
            .ball circle {
            fill: #FFF;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            }
            
            .raquet {
            position: absolute;
            transform-origin: bottom;
            width: 85px;
            height: 142px;
            z-index: 3;
            }
            
            #r1 {
            left: 0;
            top: 50%;
            transform: translate(0, -50%) rotateZ(45deg);
            }
            
            .front {
            fill: #222;
            }
            
            .middle {
            fill: #070;
            }
            
            .back {
            fill: #D00;
            }
            
            .handle.outer {
            fill: #a8712a;
            }
            
            .handle.inner {
            fill: #e0973e;
            }
            
            .shadow {
            position: absolute;
            bottom: 60px;
            left: 0;
            width: 100%;
            filter: blur(2px);
            z-index: 2;
            }
            
            .shadow ellipse {
            fill: rgba(0, 0, 0, 0.1);
            }
            
            /* Animations */
            .swingPing {
            animation: swingPing 0.3s ease-out forwards;
            }
            
            .moveRight {
            animation: moveRight 0.6s ease-in forwards 0.2s;
            }
            
            @keyframes swingPing {
            0% { transform: translate(0, -50%) rotateZ(45deg); }
            100% { transform: translate(0, -50%) rotateZ(0deg); }
            }
            
            @keyframes moveRight {
            0% { transform: translate(-50%, -50%) translateX(0); }
            100% { transform: translate(-50%, -50%) translateX(100px); }
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1 class="title">Ping Page</h1>
            
            <div class="spinner">
            <div class="ballContainer" id="ballContainer">
                <svg class="ball" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" />
                </svg>
            </div>
            <div class="raquet" id="r1">
                <svg viewBox="0 0 85 142">
                <g id="raquet">
                    <path class="back" d="M0,10 Q0,0 10,0 L75,0 Q85,0 85,10 L85,132 Q85,142 75,142 L10,142 Q0,142 0,132 L0,10"></path>
                    <path class="middle" d="M10,5 Q5,5 5,10 L5,132 Q5,137 10,137 L75,137 Q80,137 80,132 L80,10 Q80,5 75,5 L10,5"></path>
                    <path class="front" d="M15,10 Q12,10 12,13 L12,129 Q12,132 15,132 L70,132 Q73,132 73,129 L73,13 Q73,10 70,10 L15,10"></path>
                </g>
                <g id="handle">
                    <rect class="handle outer" x="30" y="137" width="25" height="25" rx="5" ry="5"></rect>
                    <rect class="handle inner" x="33" y="140" width="19" height="19" rx="2" ry="2"></rect>
                </g>
                </svg>
            </div>
            <div class="shadow">
                <svg viewBox="0 0 300 20">
                <ellipse cx="150" cy="10" rx="100" ry="5"></ellipse>
                </svg>
            </div>
            </div>
            
            <button class="actionButton" id="pingButton">Ping</button>
            <div class="modal" id="pingModal">PING</div>
        </div>

        <script>
            const pingButton = document.getElementById('pingButton');
            const pingModal = document.getElementById('pingModal');
            const ballContainer = document.getElementById('ballContainer');
            const raquet1 = document.getElementById('r1');
            
            // SSE Connection
            const eventSource = new EventSource('${env.BASE_URL}/sse/stream');
            
            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.channel === 'ping') {
                        console.log('Received ping event:', data);
                        
                        // Show modal
                        pingModal.style.display = 'block';
                        
                        // Execute animations
                        raquet1.classList.add('swingPing');
                        ballContainer.classList.add('moveRight');
                        
                        setTimeout(() => {
                            pingModal.style.display = 'none';
                            
                            // Reset animations
                            setTimeout(() => {
                                raquet1.classList.remove('swingPing');
                                ballContainer.classList.remove('moveRight');
                                ballContainer.style.transform = 'translate(-50%, -50%)';
                            }, 300);
                        }, 1000);
                    }
                } catch (error) {
                    console.error('Error processing SSE event:', error);
                }
            };
            
            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                // Auto-reconnect handled by browser
            };
            
            // Button click handler
            pingButton.addEventListener('click', () => {
                fetch('/ping-pong/ping')
                    .catch(err => console.error('Ping request failed:', err));
            });
        </script>
        </body>
        </html>`;
    }

    pongPage() {
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Pong Page</title>
        <style>
            .container {
            background: #FF9441;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            }
            
            .title {
            display: block;
            width: 100%;
            position: absolute;
            top: 20px;
            text-align: center;
            font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
            color: #FFF;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-size: 2.5rem;
            z-index: 10;
            }
            
            .actionButton {
            position: absolute;
            bottom: 30px;
            padding: 15px 50px;
            font-size: 1.8rem;
            font-weight: bold;
            background: #128C7E;
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10;
            }
            
            .actionButton:hover {
            background: #25D366;
            transform: scale(1.05);
            }
            
            .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #FF9441;
            padding: 80px 100px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            font-size: 5rem;
            font-weight: bold;
            text-align: center;
            z-index: 20;
            display: none;
            }
            
            .spinner {
            position: relative;
            text-align: center;
            margin-top: 50px;
            width: 300px;
            height: 300px;
            }
            
            .ballContainer {
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 5;
            }
            
            .ball {
            width: 40px;
            transform: translate(-50%, -50%);
            transform-origin: bottom;
            }
            
            .ball circle {
            fill: #FFF;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            }
            
            .raquet {
            position: absolute;
            transform-origin: bottom;
            width: 85px;
            height: 142px;
            z-index: 3;
            }
            
            #r2 {
            right: 0;
            top: 50%;
            transform: translate(0, -50%) rotateZ(-45deg);
            }
            
            .front {
            fill: #222;
            }
            
            .middle {
            fill: #070;
            }
            
            .back {
            fill: #D00;
            }
            
            .handle.outer {
            fill: #a8712a;
            }
            
            .handle.inner {
            fill: #e0973e;
            }
            
            .shadow {
            position: absolute;
            bottom: 60px;
            left: 0;
            width: 100%;
            filter: blur(2px);
            z-index: 2;
            }
            
            .shadow ellipse {
            fill: rgba(0, 0, 0, 0.1);
            }
            
            /* Animations */
            .swingPong {
            animation: swingPong 0.3s ease-out forwards;
            }
            
            .moveLeft {
            animation: moveLeft 0.6s ease-in forwards 0.2s;
            }
            
            @keyframes swingPong {
            0% { transform: translate(0, -50%) rotateZ(-45deg); }
            100% { transform: translate(0, -50%) rotateZ(0deg); }
            }
            
            @keyframes moveLeft {
            0% { transform: translate(-50%, -50%) translateX(0); }
            100% { transform: translate(-50%, -50%) translateX(-100px); }
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1 class="title">Pong Page</h1>
            
            <div class="spinner">
            <div class="ballContainer" id="ballContainer">
                <svg class="ball" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" />
                </svg>
            </div>
            <div class="raquet" id="r2">
                <svg viewBox="0 0 85 142">
                <g id="raquet">
                    <path class="back" d="M0,10 Q0,0 10,0 L75,0 Q85,0 85,10 L85,132 Q85,142 75,142 L10,142 Q0,142 0,132 L0,10"></path>
                    <path class="middle" d="M10,5 Q5,5 5,10 L5,132 Q5,137 10,137 L75,137 Q80,137 80,132 L80,10 Q80,5 75,5 L10,5"></path>
                    <path class="front" d="M15,10 Q12,10 12,13 L12,129 Q12,132 15,132 L70,132 Q73,132 73,129 L73,13 Q73,10 70,10 L15,10"></path>
                </g>
                <g id="handle">
                    <rect class="handle outer" x="30" y="137" width="25" height="25" rx="5" ry="5"></rect>
                    <rect class="handle inner" x="33" y="140" width="19" height="19" rx="2" ry="2"></rect>
                </g>
                </svg>
            </div>
            <div class="shadow">
                <svg viewBox="0 0 300 20">
                <ellipse cx="150" cy="10" rx="100" ry="5"></ellipse>
                </svg>
            </div>
            </div>
            
            <button class="actionButton" id="pongButton">Pong</button>
            <div class="modal" id="pongModal">PONG</div>
        </div>

        <script>
            const pongButton = document.getElementById('pongButton');
            const pongModal = document.getElementById('pongModal');
            const ballContainer = document.getElementById('ballContainer');
            const raquet2 = document.getElementById('r2');
            
            // SSE Connection
            const eventSource = new EventSource('${env.BASE_URL}/sse/stream');
            
            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.channel === 'pong') {
                        console.log('Received pong event:', data);
                        
                        // Show modal
                        pongModal.style.display = 'block';
                        
                        // Execute animations
                        raquet2.classList.add('swingPong');
                        ballContainer.classList.add('moveLeft');
                        
                        setTimeout(() => {
                            pongModal.style.display = 'none';
                            
                            // Reset animations
                            setTimeout(() => {
                                raquet2.classList.remove('swingPong');
                                ballContainer.classList.remove('moveLeft');
                                ballContainer.style.transform = 'translate(-50%, -50%)';
                            }, 300);
                        }, 1000);
                    }
                } catch (error) {
                    console.error('Error processing SSE event:', error);
                }
            };
            
            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                // Auto-reconnect handled by browser
            };
            
            // Button click handler
            pongButton.addEventListener('click', () => {
                fetch('/ping-pong/pong')
                    .catch(err => console.error('Pong request failed:', err));
            });
        </script>
        </body>
        </html>`;
    }

    ping_pong(type: string) {
        if (type === 'ping') {
            return this.redis.publish('pong', 'Ping!');
        } else if (type === 'pong') {
            return this.redis.publish('ping', 'Pong!');
        }
        return
    }

}
