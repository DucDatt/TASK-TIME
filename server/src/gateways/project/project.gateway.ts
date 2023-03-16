import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { emit } from 'process';

@WebSocketGateway({ cors: true })
export class ProjectGateway {


}
