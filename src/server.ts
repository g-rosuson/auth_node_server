import cookieParser from 'cookie-parser'
import express from 'express';
import cors from 'cors'

import controllers from 'controllers';
import middleware from 'middleware';

import config from 'config';

const server = express();

server.use(cors({ credentials: true, origin: config.clientUrl }))

server.use(cookieParser())
server.use(express.json());

server.post('/api/login',
    middleware.authentication.verifyLoginCredentials,
    controllers.authentication.loginUser
)

server.listen(1000, () => {
    console.log(`Listening on port ${1000}`);
})