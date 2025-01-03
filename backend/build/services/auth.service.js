"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
exports.login = login;
exports.refresh = refresh;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const boom_1 = __importDefault(require("@hapi/boom"));
const token_utils_1 = require("../utils/token.utils");
const prisma = new client_1.PrismaClient();
const signup = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password, username } = user;
    try {
        // Check if user with the same email already exists
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw boom_1.default.conflict('User with this email already exists');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        return yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
    }
    catch (e) {
        if (e.code === 'P2002' && ((_b = (_a = e.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
            throw boom_1.default.conflict('User with this email already exists');
        }
        else {
            throw e;
        }
    }
});
exports.signup = signup;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw boom_1.default.badRequest('Username or password is incorrect.');
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw boom_1.default.badRequest('Username or password is incorrect.');
        }
        const accessToken = (0, token_utils_1.createAccessToken)(user.id);
        const refreshToken = (0, token_utils_1.createRefreshToken)(user.id);
        return { accessToken, refreshToken };
    });
}
function refresh(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decodedToken = (0, token_utils_1.verifyRefreshToken)(refreshToken);
            return (0, token_utils_1.createAccessToken)(decodedToken.userId);
        }
        catch (error) {
            throw boom_1.default.unauthorized('User is not logged in');
        }
    });
}
