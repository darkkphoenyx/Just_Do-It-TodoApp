import Boom from '@hapi/boom';
import { Response, NextFunction } from 'express';
import { RequestWithUserObject, UserJWTPayload } from '../types';
import { verifyAccessToken } from '../utils/token.utils';

export function authenticateToken(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    let token: string | undefined;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization?.split(' ')[1];
    } else {
        token = req.headers.authorization;
    }
    if (!token) {
        throw Boom.badRequest('Missing authentication token');
    }

    try {
        const decodedToken = verifyAccessToken(token);
        req.user = decodedToken as UserJWTPayload; // Attach user info
        next();
    } catch (error) {
        throw Boom.unauthorized('Invalid or expired token');
    }
}
