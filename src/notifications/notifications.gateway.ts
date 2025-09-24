import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  emitToUser(userId: string, event: string, payload: any) {
    this.server.to(userId).emit(event, payload);
  }
}

