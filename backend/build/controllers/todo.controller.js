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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByStatus = exports.searchByTitle = exports.toggleTodo = exports.updateTodo = exports.deleteTodosByID = exports.getTodosAll = exports.getTodosByID = exports.postTodos = void 0;
const todoService = __importStar(require("../services/todo.service"));
// POST todos
const postTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const response = yield todoService.postTodo(req.body, userId);
    res.send(response);
});
exports.postTodos = postTodos;
// GET by id
const getTodosByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield todoService.getTodo(Number(req.params.id));
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.getTodosByID = getTodosByID;
// GET todos All
const getTodosAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.getTodosAll(userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.getTodosAll = getTodosAll;
// DELETE by id
const deleteTodosByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.deleteTodo(Number(req.params.id), userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTodosByID = deleteTodosByID;
// UPDATE by id
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.updateTodo(Number(req.params.id), req.body, userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.updateTodo = updateTodo;
// TOGGLE by id
const toggleTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.toggleTodo(Number(req.params.id), userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.toggleTodo = toggleTodo;
// Search by title
const searchByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.searchByTitle(req.query.title, userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.searchByTitle = searchByTitle;
// Search by status
const searchByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const response = yield todoService.searchByStatus(req.query.status, userId);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.searchByStatus = searchByStatus;
