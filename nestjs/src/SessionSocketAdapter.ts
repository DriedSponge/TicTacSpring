import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from 'socket.io';
import { WebSocketAdapter, INestApplicationContext,INestApplication  } from '@nestjs/common';
import * as session from 'express-session';
import * as sharedsession from 'express-socket.io-session'
export class SessionSocketAdapter extends IoAdapter {
    private app: INestApplication;
    constructor(app: INestApplication) {
        super(app)
        this.app = app
    }
    createIOServer(port: number, options?: ServerOptions): any {

        const server = super.createIOServer(port, options);
        const sessionMiddleware = session({
            secret: 'my-secret',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 86400000 }
        });
        this.app.use(sessionMiddleware)
        // convert a connect middleware to a Socket.IO middleware
        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
        server.use(sharedsession(sessionMiddleware))
        return server;
    }
}