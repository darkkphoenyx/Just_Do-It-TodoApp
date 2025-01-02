import express, {
    RequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express'
import cors from 'cors'
// import todosRouter from './routes/todo.router'
import userRouter from './routes/auth.router'
import buildError from './utils/build-error'
import dotenv from 'dotenv';
dotenv.config();
const app = express()

app.use(express.json())
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.use(cors())
// app.use('/todos', todosRouter)
app.use('/user', userRouter)

//Error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})

export default app