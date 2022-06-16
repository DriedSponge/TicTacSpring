// @ts-nocheck
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards } from '@nestjs/common';
import { SessionwsGuard } from 'src/sessionws.guard';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { Game, Player } from '@prisma/client';
import { OnGatewayDisconnect } from "@nestjs/websockets";
import { Tile } from './Tile';

@WebSocketGateway({ cors: { origin: ["http://localhost:3000"], credentials: true } })
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) { }

  @UseGuards(SessionwsGuard)
  async handleDisconnect(socket: Socket) {
    // @ts-ignore
    if (socket.handshake.session.sockedId == socket.id) {
      try {
        // @ts-ignore
        let player: Player = await this.gameService.prisma.player.findFirst({
          where: {
            uid: socket.handshake.session.uid
          },
          include: {
            game: true
          },
          rejectOnNotFound: true
        })
        this.server.to(player.gameId).emit("game:playerDisconnected", { message: "Opponent disconnected. Game over!" })
        await this.gameService.deleteGameByCode(player.gameId);
      } catch (e) {
        console.log("Game to delte not found.")
      }
    } else {
      console.log("Person disconnected but was not in game.")
    }
  }

  @SubscribeMessage('game:join')
  @UseGuards(SessionwsGuard)
  async joinGame(socket: Socket, data: any): Promise<Object> {
    try {
      let game: Game = await this.gameService.getGameByCode(data.gameId);
      //@ts-ignore
      let name: stirng = socket.handshake.session.name;
      if (game.players.length == 2) {
        return { "success": false, message: "Game is full!" }
      }

      await this.gameService.prisma.game.update({
        where: { code: game.code },
        data: {
          players: {
            create: {
              uid: socket.handshake.session.uid,
              name: socket.handshake.session.name,
              symbol: "o"
            }
          }
        }
      })
      socket.handshake.session.gameId = data.gameId;
      socket.handshake.session.symbol = "o";
      socket.handshake.session.save()
      socket.to(data.gameId).emit("game:playerJoined", { player: socket.handshake.session.name });
      return { "success": true }
    } catch (e) {
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
    const game: Game = await this.gameService.createGame(socket.handshake.session.name, socket.handshake.session.uid);

    // @ts-ignore
    socket.handshake.session.gameId = game.code;
    // @ts-ignore
    socket.handshake.session.symbol = "x";
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
      socket.join(socket.handshake.session.gameId)
      let opponent: string = "";
      if (game.players[1] != undefined) {
        opponent = game.players[0].name
      }
      socket.handshake.session.sockedId = socket.id;
      //@ts-ignore
      socket.handshake.session.save()
      return { "success": true, opponent: opponent, symbol: socket.handshake.session.symbol, turn: game.turn, data: JSON.parse(game.gameState) }
    } catch (e) {
      console.log(e)
      return { sucess: false, message: "Game not found!" }
    }
  }

  @SubscribeMessage('makeMove')
  @UseGuards(SessionwsGuard)
  async makeMove(socket: Socket, data: any): Promise<Object> {

    let player: Player = await this.gameService.prisma.player.findFirst({
      where: {
        uid: socket.handshake.session.uid
      },
      include: {
        game: true
      },
    })
    
    if(player.symbol != player.game.turn){
      return { success: false, message:"It's not your turn!", turn:player.game.turn, data: JSON.parse(player.game.gameSate)}
    }
    // Check for wins.
    if(Tile.checkWinner(player.symbol,data.move)){
      console.log("We have a winner!")
      this.server.to(player.gameId).emit("game:winner",{ winner: player.name, move: data.move})
      return {success: true};
    }else if(Tile.checkTie(data.move)){
      this.server.to(player.gameId).emit("game:draw",{ move: data.move})
      return{success: true}
    }
    let nextTurn: string = player.symbol == "x" ? "o" : "x"
    
    await this.gameService.prisma.game.update({
      where: {
        code: player.gameId
      },
      data: {
        turn: nextTurn,
        gameState: JSON.stringify(data.move)
      }
    })

    socket.to(player.gameId).emit("game:moveMade", { player:player.name, move: data.move, turn: nextTurn })
    return {success: true, turn: nextTurn };
  }





  @SubscribeMessage('game:chat')
  @UseGuards(SessionwsGuard)
  chatMessage(socket: Socket, payload: any): string {
    console.log(payload);
    // Note to self: When using socket.to(), it sends the message to the room from the socket, so the person who sent the message does not receive it
    // Use io.to() to send to all clients connected to room
    // @ts-ignore
    socket.to(socket.handshake.session.gameId).emit("game:chat", { content: payload.content, from: socket.handshake.session.name })
    //@ts-ignore
    return "Message Sent";
  }
}
