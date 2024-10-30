import { CookieOptions, Request, Response } from 'express';

import { TokenExpiration } from 'schemas/enums/tokens'

import services from 'services';
import config from 'config';

interface IRequest extends Request {
    userData: {
        id: string
        email: string
        tokenVersion: number
    }
}

const loginUser = (req: Request, res: Response) => {
    try {
        const userData = (req as IRequest).userData;

        // Create tokens
        const { accessToken, refreshToken } = services.jwt.createTokens(userData);

        // Determine default, access and refresh cookie options
        const defaultCookieOptions: CookieOptions = {
            httpOnly: true,
            secure: config.isProduction,
            sameSite: config.isProduction ? 'strict' : 'lax',
            domain: config.baseDomain,
            path: '/',
        }

        const accessTokenCookieOptions = {
            ...defaultCookieOptions,
            maxAge: TokenExpiration.Access,
        }

        const refreshTokenCookieOptions = {
            ...defaultCookieOptions,
            maxAge: TokenExpiration.Refresh,
        }

        // Set cookies
        res.cookie('accessToken', accessToken, accessTokenCookieOptions);

        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
        }

        res.status(200).send({ message: 'User successfully logged in'});

    } catch (error) {
        res.status(500).json(error);
    }
}



const authentication = {
    loginUser
}

export default authentication;