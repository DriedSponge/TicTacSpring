import { SubscribeMessage, WebSocketGateway, WebSocketServer,WsResponse  } from '@nestjs/websockets';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards } from '@nestjs/common';
import { SessionwsGuard } from 'src/sessionws.guard';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: { origin: ["http://localhost:3000"], credentials: true } })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('joinGame')
  @UseGuards(SessionwsGuard)
  handleMessage(socket: Socket, data: any): string {
    socket.join(data.gameId)
    return 'Hello world!';
  }

  @SubscribeMessage('chatMessage')
  @UseGuards(SessionwsGuard)
  handleChat(socket: Socket, payload: any): WsResponse<unknown>  {
    console.log(payload);
    // @ts-ignore
    socket.to(payload.gameId).emit("chatEvent",{content:payload.content, from:socket.handshake.session.name})
    //@ts-ignore
    return {event:"chatEvent",room:payload.gameId,data:{content:payload.content, from:socket.handshake.session.name}};
  }
}
