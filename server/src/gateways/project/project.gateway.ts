import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { emit } from 'process';

@WebSocketGateway({cors: true})
export class ProjectGateway {
  @WebSocketServer() server: any;

  handleConnection(client: any, ...args: any[]) {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`client disconnected: ${client.id}`);
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    this.server.emit('message', payload);
    return 'Hello world!';
  }
}
