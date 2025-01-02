import { Request, Response, NextFunction } from 'express'
import * as todoService from '../services/todo.service'
import { ItodoBody, IupdateTodo } from '../interface/todo.interface'

//POST todos
export const postTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await todoService.postTodo(req.body as ItodoBody)
    res.send(response)
}

//GET by id
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

//GET todos All
export const getTodosAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.getTodosAll()
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//DELETE by id
export const deleteTodosByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.deleteTodo(Number(req.params.id))
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//UPDATE by id
export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.updateTodo(Number(req.params.id), req.body as IupdateTodo)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//TOGGLE by id
export const toggleTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await todoService.toggleTodo(Number(req.params.id))
        res.json(response)
    } catch (err) {
        next(err)
    }
}