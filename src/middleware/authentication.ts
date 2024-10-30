import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcrypt';

import { mockUserData } from 'mongodb/mock';

interface IRequest extends Request {
    userData: {
        id: string
        email: string
        tokenVersion: number
    }
}

const verifyLoginCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const userData = mockUserData.find(user => user.email === email);

    if (!userData) {
        return res.status(404).send({
            message: 'Invalid credentials'
        })
    }

    const isPasswordValid = await compare(password, userData.password);

    if (!isPasswordValid) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    (req as IRequest).userData = {
        id: userData.id,
        email: userData.email,
        tokenVersion: userData.tokenVersion
    }

    next();
}

const authentication = {
    verifyLoginCredentials
}

export default authentication;