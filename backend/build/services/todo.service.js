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
exports.searchByStatus = exports.searchByTitle = exports.toggleTodo = exports.updateTodo = exports.deleteTodo = exports.getTodosAll = exports.getTodo = exports.postTodo = void 0;
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
// POST todos
const postTodo = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.todo.create({
            data: Object.assign({}, body),
        });
    }
    catch (err) {
        throw boom_1.default.internal('Internal Server Error', err);
    }
});
exports.postTodo = postTodo;
// GET todos by id
const getTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw boom_1.default.notFound('Todo not found');
        }
        return todo;
    }
    catch (err) {
        throw boom_1.default.notFound('Todo not found', err);
    }
});
exports.getTodo = getTodo;
// Get all todos
const getTodosAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.todo.findMany({
            select: {
                id: true,
                title: true,
                isCompleted: true,
                content: true,
                updatedAt: true,
                userId: true,
            }
        });
    }
    catch (err) {
        throw boom_1.default.badImplementation('Failed to get todos', err);
    }
});
exports.getTodosAll = getTodosAll;
// DELETE by id
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield prisma.todo.delete({
            where: { id },
        });
        return { message: 'Todo deleted successfully', id: todo.id };
    }
    catch (err) {
        throw boom_1.default.notFound('Todo not found', err);
    }
});
exports.deleteTodo = deleteTodo;
// UPDATE by id
const updateTodo = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield prisma.todo.update({
            where: { id },
            data: Object.assign({}, body),
        });
        return {
            id: todo.id,
            title: todo.title,
            content: todo.content,
            isCompleted: todo.isCompleted,
            updatedAt: todo.updatedAt,
            userId: todo.userId,
        };
    }
    catch (err) {
        throw boom_1.default.notFound('Todo not found', err);
    }
});
exports.updateTodo = updateTodo;
// Toggle todo
const toggleTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw boom_1.default.notFound('Todo not found');
        }
        const updatedTodo = yield prisma.todo.update({
            where: { id },
            data: { isCompleted: !todo.isCompleted },
        });
        return { id: updatedTodo.id, isCompleted: updatedTodo.isCompleted };
    }
    catch (err) {
        throw boom_1.default.badImplementation('Failed to toggle todo', err);
    }
});
exports.toggleTodo = toggleTodo;
// Search by title
const searchByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield prisma.todo.findMany({
            where: {
                title: {
                    contains: title,
                },
            },
        });
        return todo;
    }
    catch (err) {
        throw boom_1.default.badImplementation('Failed to search todo', err);
    }
});
exports.searchByTitle = searchByTitle;
// Search by status
const searchByStatus = (isCompleted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedStatus = handleStatus(isCompleted);
        if (convertedStatus.toString().length === 0) {
            return yield (0, exports.getTodosAll)();
        }
        const todo = yield prisma.todo.findMany({
            where: {
                isCompleted: convertedStatus,
            },
        });
        return todo;
    }
    catch (err) {
        throw boom_1.default.badImplementation('Failed to search todo', err);
    }
});
exports.searchByStatus = searchByStatus;
function handleStatus(value) {
    switch (value) {
        case 'completed':
            return true;
        case 'remaining':
            return false;
        default:
            return "";
    }
}
