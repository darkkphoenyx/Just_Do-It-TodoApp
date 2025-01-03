"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const boom_1 = __importDefault(require("@hapi/boom"));
const token_utils_1 = require("../utils/token.utils");
function authenticateToken(req, res, next) {
    var _a, _b;
    let token;
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
        token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    }
    else {
        token = req.headers.authorization;
    }
    if (!token) {
        throw boom_1.default.badRequest('Missing authentication token');
    }
    try {
        const decodedToken = (0, token_utils_1.verifyAccessToken)(token);
        req.user = decodedToken; // Attach user info
        next();
    }
    catch (error) {
        throw boom_1.default.unauthorized('Invalid or expired token');
    }
}
