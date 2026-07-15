import express, { type Application, type Request, type Response } from 'express'
import { issueRoute } from './modules/issue/issue.route'
import globalErrorHandler from './middleware/globalErrorHandler'
import { authRoute } from './modules/auth/auth.route'
import cors from "cors";

const app: Application = express()
app.use(cors());
app.use(express.json())
app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({"message": "Welcome to DevPulse!!", author: 'Sumaiya Khondoker Nabila'})
})

app.use('/api/auth', authRoute)
app.use('/api/issues', issueRoute)


app.use(globalErrorHandler)
export default app;