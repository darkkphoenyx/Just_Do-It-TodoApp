import { Request, Response, NextFunction } from 'express'
import * as todoService from '../services/todo.service'
import { ItodoBody, IupdateTodo } from '../interface/todo.interface'

// POST todos
export const postTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user.userId
    const response = await todoService.postTodo(req.body as ItodoBody,userId)
    res.send(response)
}

// GET by id
export const getTodosByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.getTodo(Number(req.params.id))
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// GET todos All
export const getTodosAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId
        const response = await todoService.getTodosAll(userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// DELETE by id
export const deleteTodosByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId
        const response = await todoService.deleteTodo(Number(req.params.id),userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// UPDATE by id
export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId
        const response = await todoService.updateTodo(Number(req.params.id), req.body as IupdateTodo,userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// TOGGLE by id
export const toggleTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId
        const response = await todoService.toggleTodo(Number(req.params.id),userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// Search by title
export const searchByTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId  
        const response = await todoService.searchByTitle(req.query.title as string,userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

// Search by status
export const searchByStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId
        const response = await todoService.searchByStatus(req.query.status as string,userId)
        res.json(response)
    } catch (err) {
        next(err)
    }
}