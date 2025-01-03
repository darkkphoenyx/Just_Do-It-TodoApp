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
const todoController = __importStar(require("../controllers/todo.controller"));
const validate_1 = require("../utils/validate");
const todo_validator_1 = require("../validarors/todo.validator");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const router = (0, express_1.Router)();
router.post('/create', (0, validate_1.validate)(todo_validator_1.postTodoDto), authentication_middleware_1.authenticateToken, todoController.postTodos);
router.get('/get/:id', authentication_middleware_1.authenticateToken, todoController.getTodosByID);
router.get('/getAll', authentication_middleware_1.authenticateToken, todoController.getTodosAll);
router.delete('/delete/:id', authentication_middleware_1.authenticateToken, todoController.deleteTodosByID);
router.patch('/update/:id', authentication_middleware_1.authenticateToken, todoController.updateTodo);
router.patch('/toggle/:id', authentication_middleware_1.authenticateToken, todoController.toggleTodo);
router.get('/title', authentication_middleware_1.authenticateToken, todoController.searchByTitle);
router.get('/status', authentication_middleware_1.authenticateToken, todoController.searchByStatus);
exports.default = router;
