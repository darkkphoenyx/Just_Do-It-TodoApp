"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.loginBodySchema = exports.signupSchema = exports.signupBodySchema = void 0;
const zod_1 = require("zod");
exports.signupBodySchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Email address is invalid'),
    password: zod_1.z.string({
        required_error: 'Password is required ',
    }),
    username: zod_1.z.string({
        required_error: 'Username is required',
    }),
});
exports.signupSchema = zod_1.z.object({
    body: exports.signupBodySchema,
});
exports.loginBodySchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Email address is invalid'),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
});
exports.loginSchema = zod_1.z.object({
    body: exports.loginBodySchema,
});
