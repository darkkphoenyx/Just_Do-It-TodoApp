import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import { ItodoBody, IupdateTodo } from '../interface/todo.interface'

const prisma = new PrismaClient()

// POST todos
export const postTodo = async (body: ItodoBody,userId:any) => {
    try {
        return await prisma.todo.create({
            data: {
                ...body,
                userId: userId,
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
            include: { user: true },
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
        return await prisma.todo.findMany({
            select: {
                id: true,
                title: true,
                isCompleted: true,
                content: true,
                updatedAt: true,
                userId: true,
                user: true,
            },
        })
    } catch (err: any) {
        throw Boom.badImplementation('Failed to get todos', err)
    }
}

// DELETE by id
export const deleteTodo = async (id: number,userId:any) => {
    try {
        
        const IsTodo = await prisma.todo.findUnique({
            where: {
                id,
                userId,
            },
        })
        console.log(IsTodo)
        if (!IsTodo) {
            throw Boom.notFound('Not Authorized to delete todo')
        }
        const todo = await prisma.todo.delete({
            where: { id }
        })
        if (!todo) {
            throw Boom.notFound('Not Authorized to delete todo')
        }
        return { message: 'Todo deleted successfully', id: todo.id }
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}

// UPDATE by id
export const updateTodo = async (id: number, body: Partial<IupdateTodo>) => {
    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { ...body },
        })
        return {
            id: todo.id,
            title: todo.title,
            content: todo.content,
            isCompleted: todo.isCompleted,
            updatedAt: todo.updatedAt,
            userId: todo.userId,
        }
    } catch (err: any) {
        throw Boom.notFound('Todo not found', err)
    }
}

// Toggle todo
export const toggleTodo = async (id: number) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: { id },
        })
        if (!todo) {
            throw Boom.notFound('Todo not found')
        }
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { isCompleted: !todo.isCompleted },
        })
        return { id: updatedTodo.id, isCompleted: updatedTodo.isCompleted }
    } catch (err: any) {
        throw Boom.badImplementation('Failed to toggle todo', err)
    }
}

// Search by title
export const searchByTitle = async (title: string) => {
    try {
        const todo = await prisma.todo.findMany({
            where: {
                title: {
                    contains: title,
                },
            },
        })
        return todo
    } catch (err: any) {
        throw Boom.badImplementation('Failed to search todo', err)
    }
}

// Search by status
export const searchByStatus = async (isCompleted: string) => {
    try {
        const convertedStatus: boolean | string = handleStatus(isCompleted)
        if (convertedStatus.toString().length === 0) {
            return await getTodosAll()
        }
        const todo = await prisma.todo.findMany({
            where: {
                isCompleted: convertedStatus as boolean,
            },
        })
        return todo
    } catch (err: any) {
        throw Boom.badImplementation('Failed to search todo', err)
    }
}

function handleStatus(value: string) {
    switch (value) {
        case 'completed':
            return true
        case 'remaining':
            return false
        default:
            return ""
    }
}
