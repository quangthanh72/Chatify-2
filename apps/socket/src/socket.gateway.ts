import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common';

@WebSocketGateway(80, { namespace: 'events' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Socket;

  constructor(
    private readonly socketService: SocketService,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  handleConnection(socket: Socket) {
    this.socketService.handleConnection(socket);
  }
}
