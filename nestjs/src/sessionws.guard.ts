
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionwsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const wssession = context.switchToWs().getClient().handshake.session;
    if (wssession == undefined) {
      return false;
    }
    if (wssession.name && wssession.uid) {
      return true;
    } else {
      console.log("fail2")
      return false
    }
  }
}
