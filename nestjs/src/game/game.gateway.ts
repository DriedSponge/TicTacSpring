import { SubscribeMessage, WebSocketGateway, WebSocketServer,WsResponse  } from '@nestjs/websockets';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards } from '@nestjs/common';
import { SessionwsGuard } from 'src/sessionws.guard';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { Game } from '@prisma/client';
@WebSocketGateway({ cors: { origin: ["http://localhost:3000"], credentials: true } })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) { }

  @SubscribeMessage('joinGame')
  @UseGuards(SessionwsGuard)
  handleMessage(socket: Socket, data: any): string {
    // TO-DO: Should set session game id and be using it instead of sending it over network where it needs to be validated.
    // Should actucally create game here
    
    // @ts-ignore
    socket.join(socket.handshake.session.gameId)
    // @ts-ignore
    socket.to(socket.handshake.session.gameId).emit("playerJoin",{player:socket.handshake.session.name})
    return 'Hello world!';
  }

  @SubscribeMessage('createGame')
  @UseGuards(SessionwsGuard)
  async handleGameCreation(socket: Socket, data: any): Promise<number> {
    // @ts-ignore
    if ( socket.handshake.session.gameId) {
      //@ts-ignore
      await this.gameService.deleteGameByCode(socket.handshake.session.gameId)
    }
    const game: Game = await this.gameService.createGame();
    // @ts-ignore
    socket.handshake.session.gameId = game.code;
    socket.join(game.code.toString())
    return game.code;
  }
  @SubscribeMessage('chatMessage')
  @UseGuards(SessionwsGuard)
  handleChat(socket: Socket, payload: any): string  {
    console.log(payload);
    // Note to self. When using socket.to(), it sends the message to the room from the socket, so the person who sent the message does not receive it
    // Use io.to() to send to all clients connected to room
    // @ts-ignore
    socket.to(socket.handshake.session.gameId).emit("chatEvent",{content:payload.content, from:socket.handshake.session.name})
    //@ts-ignore
    return "Message Sent";
  }
}
