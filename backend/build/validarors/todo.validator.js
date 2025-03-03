"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTodoDto = void 0;
const zod_1 = require("zod");
exports.postTodoDto = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required'
        }),
        content: zod_1.z.string({
            required_error: 'content is required'
        })
    }),
});
