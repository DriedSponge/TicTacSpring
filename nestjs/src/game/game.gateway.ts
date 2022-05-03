import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards} from '@nestjs/common';

@WebSocketGateway({cors:{origin:["http://localhost:3000"],credentials:true}})
export class GameGateway {
 
}
