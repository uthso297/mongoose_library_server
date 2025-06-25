import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './App/Controllers/book.controller'
import { borrowRoutes } from './App/Controllers/borrow.controller'
const app: Application = express()

app.use(express.json())
app.use('/api', bookRoutes)
app.use('/api', borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to library management server😍')
})

export default app;