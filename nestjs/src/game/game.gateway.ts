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
  handleChat(socket: Socket, payload: any): string  {
    console.log(payload);
    // Note to self. When using socket.to(), it sends the message to the room from the socket, so the person who sent the message does not receive it
    // Use io.to() to send to all clients connected to room
    // @ts-ignore
    socket.to(payload.gameId).emit("chatEvent",{content:payload.content, from:socket.handshake.session.name})
    //@ts-ignore
    return "Message Sent";
  }
}
