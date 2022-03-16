import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class GameGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    return 'Hello world!';
  }
}
