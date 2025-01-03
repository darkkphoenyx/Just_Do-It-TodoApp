"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../utils/validate");
const auth_validator_1 = require("../validarors/auth.validator");
const AuthController = __importStar(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post('/login', (0, validate_1.validate)(auth_validator_1.loginSchema), AuthController.loginUser);
router.post(`/signup`, (0, validate_1.validate)(auth_validator_1.signupSchema), AuthController.registerUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', () => {
    console.log('this method should store any session info if stored, or remove cookie from the header');
});
router.post('/forgot-password', () => {
    console.log('this method should send an email using sendgrid to the user with forgot password link');
});
exports.default = router;
