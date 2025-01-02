import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import { ItodoBody, IupdateTodo } from '../interface/todo.interface'

const prisma = new PrismaClient()

// POST todos
export const postTodo = async (body: ItodoBody) => {
    try {
        return await prisma.todo.create({
            data: {
                ...body,
            },
        })
    } catch (err: any) {
        throw Boom.internal('Internal Server Error', err)
    }
}

// GET todos by id
export const getTodo = async (id: number) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: { id },
        })
        if (!todo) {
            throw Boom.notFound('Todo not found')
        }
        return todo
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}

// Get all todos
export const getTodosAll = async () => {
    try {
        return await prisma.todo.findMany()
    } catch (err: any) {
        throw Boom.badImplementation('Failed to get todos', err)
    }
}

// DELETE by id
export const deleteTodo = async (id: number) => {
    try {
        const todo = await prisma.todo.delete({
            where: { id },
        })
        return {message: 'Todo deleted successfully', id: todo.id}
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}

// UPDATE by id
export const updateTodo = async (id: number, body:Partial <IupdateTodo>) => {
    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { ...body},
        })
        return { id: todo.id, title: todo.title, content: todo.content, isCompleted: todo.isCompleted, updatedAt: todo.updatedAt }
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}


// Toggle todo
export const toggleTodo = async (id: number) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw Boom.notFound('Todo not found');
        }
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { isCompleted: !todo.isCompleted },
        });
        return { id: updatedTodo.id, isCompleted: updatedTodo.isCompleted };
    } catch (err: any) {
         if (err.isBoom) {
            throw err;
        }
        throw Boom.badImplementation('Failed to toggle todo', err);
    }
};