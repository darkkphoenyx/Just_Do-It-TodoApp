import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signupBodySchema } from '../vallidators/auth.validator';
import { z } from 'zod';
import Boom from '@hapi/boom';
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from '../utils/token.utils';

const prisma = new PrismaClient();

export const signup = async (user: z.infer<typeof signupBodySchema>) => {
    const { email, password, username } = user;
    try {
        // Check if user with the same email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw Boom.conflict('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
    } catch (e: any) {
        if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
            throw Boom.conflict('User with this email already exists');
        } else {
            throw e;
        }
    }
};

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw Boom.badRequest('Username or password is incorrect.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.');
    }

    const accessToken = createAccessToken(user.id);

    const refreshToken = createRefreshToken(user.id);

    return { accessToken, refreshToken };
}

export async function refresh(refreshToken: string) {
    try {
        const decodedToken: any = verifyRefreshToken(refreshToken);
        return createAccessToken(decodedToken.userId);
    } catch (error) {
        throw Boom.unauthorized('User is not logged in');
    }
}