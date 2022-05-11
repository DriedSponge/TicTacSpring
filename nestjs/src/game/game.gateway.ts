import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards} from '@nestjs/common';
import { SessionwsGuard } from 'src/sessionws.guard';

@WebSocketGateway({cors:{origin:["http://localhost:3000"],credentials:true}})
export class GameGateway {
    
    @SubscribeMessage('joinGame')
    @UseGuards(SessionwsGuard)
    handleMessage(client: any, payload: any): string {
      console.log(payload.gameId)
      return 'Hello world!';
    }

    @SubscribeMessage('chatMessage')
    handleChat(client: any, payload: any): string {
      return 'Hello world!';
    }
}
