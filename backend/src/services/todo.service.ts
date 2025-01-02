import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'

const prisma = new PrismaClient()

// POST todos
export const postTodo = async (body: any) => {
    const { title, content } = body
    try {
        return await prisma.todo.create({
            data: {
                title,
                content,
                isCompleted: false,
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
        return todo
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}

// UPDATE by id
export const updateTodo = async (id: number, body: any) => {
    const { title, content } = body
    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { title, content },
        })
        return todo
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
        throw Boom.badImplementation('Failed to toggle todo', err);
    }
}