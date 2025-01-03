"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_router_1 = __importDefault(require("./routes/todo.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const build_error_1 = __importDefault(require("./utils/build-error"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use((0, cors_1.default)());
app.use('/todos', todo_router_1.default);
app.use('/user', auth_router_1.default);
// Dynamic Error Handler
app.use((err, req, res, next) => {
    const error = (0, build_error_1.default)(err);
    res.status(error.code).json({
        error: {
            message: error.message,
            details: error.details || null,
        },
    });
});
exports.default = app;
