import { Router } from 'express';
import * as todoController from '../controllers/todo.controller';
import { validate } from '../utils/validate';
import { postTodoDto } from '../validarors/todo.validator';
import { authenticateToken } from '../middleware/authentication.middleware';

const router = Router();

router.post('/create', validate(postTodoDto), authenticateToken, todoController.postTodos);

router.get('/get/:id', authenticateToken, todoController.getTodosByID);

router.get('/getAll', authenticateToken, todoController.getTodosAll);

router.delete('/delete/:id', authenticateToken, todoController.deleteTodosByID);

router.patch('/update/:id', authenticateToken, todoController.updateTodo);

router.patch('/:id/toggle', authenticateToken, todoController.toggleTodo);

export default router;
