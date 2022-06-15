// @ts-nocheck
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
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

  @SubscribeMessage('game:join')
  @UseGuards(SessionwsGuard)
  async joinGame(socket: Socket, data: any): Promise<Object> {
    try {
      let game: Game = await this.gameService.getGameByCode(data.gameId);
      //@ts-ignore
      let name: stirng = socket.handshake.session.name;
      if (game.o != null) {
        return { "success": false, message: "Game is full!" }
      }
      await this.gameService.prisma.game.update({ where: { code: game.code }, data: { o: name } })
      //@ts-ignore
      socket.handshake.session.gameId = data.gameId;
      //@ts-ignore
      socket.handshake.session.save()
      //@ts-ignore
      socket.to(data.gameId).emit("game:playerJoined", { player: socket.handshake.session.name });
      return { "success": true }
    } catch (e) {
      console.log(e)
      return { sucess: false, message: "Game not found!" }
    }
  }

  @SubscribeMessage('game:create')
  @UseGuards(SessionwsGuard)
  async createGame(socket: Socket, data: any): Promise<string> {
    // @ts-ignore
    if (socket.handshake.session.gameId) {
      //@ts-ignore
      await this.gameService.deleteGameByCode(socket.handshake.session.gameId)
    }
    //@ts-ignore
    const game: Game = await this.gameService.createGame(socket.handshake.session.name);
    // @ts-ignore
    socket.handshake.session.gameId = game.code;
    //@ts-ignore
    socket.handshake.session.save()
    return game.code;
  }

  @SubscribeMessage('game:connect')
  @UseGuards(SessionwsGuard)
  async connectGame(socket: Socket, data: any): Promise<Object> {
    try {
      //@ts-ignore
      let game: Game = await this.gameService.getGameByCode(socket.handshake.session.gameId);

      //@ts-ignore
      console.log(socket.handshake.session);
      //@ts-ignore
      socket.join(socket.handshake.session.gameId)
      let opponent:string = "";
      if(game.o == socket.handshake.session.name){
        opponent = game.x
      }
      return { "success": true, opponent: opponent }
    } catch (e) {
      return { sucess: false, message: "Game not found!" }
    }
  }

  @SubscribeMessage('makeMove')
  @UseGuards(SessionwsGuard)
  makeMove(socket: Socket, data: any): string {
    console.log(data)
    // @ts-ignore
    socket.to(socket.handshake.session.gameId).emit("moveMade", { player: socket.handshake.session.name, move: data.move })
    return 'Hello world!';
  }





  @SubscribeMessage('chatMessage')
  @UseGuards(SessionwsGuard)
  chatMessage(socket: Socket, payload: any): string {
    console.log(payload);
    // Note to self: When using socket.to(), it sends the message to the room from the socket, so the person who sent the message does not receive it
    // Use io.to() to send to all clients connected to room
    // @ts-ignore
    socket.to(socket.handshake.session.gameId).emit("chatEvent", { content: payload.content, from: socket.handshake.session.name })
    //@ts-ignore
    return "Message Sent";
  }
}
